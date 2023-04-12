import { BadRequestException, Injectable, Logger, NotFoundException } from "@nestjs/common";
import { Cron, CronExpression } from "@nestjs/schedule";
import { UpdateWay } from "src/pages/models/update-way.enum";
import { PageEntity } from "src/pages/page.entity";
import { UserEntity } from "src/users/user.entity";
import { UsersService } from "src/users/users.service";
import { MetricDataType } from "src/_common/models/metric-data-type";
import { isLongThanOneDay, isValidURL } from "src/_common/utils";
import { CollectDataAnswerDto } from "./dto/collect-data-answer.dto";
import { PageSpeedService } from "./services/page-speed.service";

@Injectable()
export class MetricsService {
  private logger: Logger = new Logger(this.constructor.name);

  constructor(
    private usersService: UsersService,
    private pageSpeedService: PageSpeedService,
  ) { }

  @Cron(CronExpression.EVERY_DAY_AT_NOON, {
    timeZone: "Europe/Kiev"
  })
  async collectDailyMetrics(): Promise<void> {
    this.logger.log("Start collecting DAILY metrics from all users...");
    const users: UserEntity[] = await this.usersService.getUsers();

    for (let user of users) {
      this.logger.log(`Start collecting metrics for user ${user.username}`);

      const today: Date = new Date();
      const pagesToCollectMetrics = user.pages.filter((page: PageEntity) => {
        return page.updateWay === UpdateWay.PER_DAY
          && isValidURL(page.url)
          && isLongThanOneDay(page.lastUpdate, today)
      });

      console.dir({ pagesToCollectMetrics });

      this.pageSpeedService.collectMetrics(pagesToCollectMetrics, null);

      for (let page of pagesToCollectMetrics) {
        page.lastUpdate = today;
        await page.save();
      }

      this.logger.log(`Finish collecting metrics for user ${user.username}`);
    }
    this.logger.log("Finish collecting DAILY metrics from all users...");
  }

  async collectAllPagesMetrics(apiKey: string, comment?: string): Promise<CollectDataAnswerDto> {
    const user: UserEntity = await this.usersService.getUserByApiKey(apiKey);
    this.logger.log(`Start collecting pages data for user *** ${user.username} ***`);

    const pagesToCollectMetrics = [];
    const pagesWithCollectedMetricsThisDay = [];
    const today: Date = new Date();

    for (let page of user.pages) {
      if (!isValidURL(page.url)) {
        this.logger.log(`Page ${page.url} is not valid, processing without it`);
        continue;
      }

      if (page.lastUpdate !== null && !isLongThanOneDay(page.lastUpdate, today)) {
        pagesWithCollectedMetricsThisDay.push(page);
      } else {
        pagesToCollectMetrics.push(page);
      }
    }

    this.pageSpeedService.collectMetrics(pagesToCollectMetrics, comment);

    for (let pageToCollect of pagesToCollectMetrics) {
      pageToCollect.lastUpdate = new Date();
      await pageToCollect.save();
    }

    return {
      pagesWillBeCollected: pagesToCollectMetrics.map(p => p.id),
      pagesWillNotBeCollcted: pagesWithCollectedMetricsThisDay.map(p => p.id),
    };
  }

  async collectPageMetrics(
    apiKey: string,
    pageId: number,
    comment?: string,
  ): Promise<CollectDataAnswerDto> {
    const user: UserEntity = await this.usersService.getUserByApiKey(apiKey);
    const page: PageEntity = user.pages.find((p: PageEntity) => p.id === pageId);

    if (!page) {
      throw new NotFoundException(`User with apiKey ${apiKey} do not have page with id: ${pageId}`);
    }

    if (!isValidURL(page.url)) {
      throw new BadRequestException(`${page.url} is not valid url, to collect data`);
    }

    const today: Date = new Date();

    if (page.lastUpdate !== null && !isLongThanOneDay(page.lastUpdate, today)) {
      throw new BadRequestException(`Data can be collected no more than once a day`);
    }

    this.pageSpeedService.collectMetrics([page], comment);
    page.lastUpdate = new Date();
    await page.save();

    return {
      pagesWillBeCollected: [page.id],
      pagesWillNotBeCollcted: [],
    };
  }


}