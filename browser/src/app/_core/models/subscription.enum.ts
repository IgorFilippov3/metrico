export enum Subscription {
  basic = "basic",
  essential = "essential",
}

export namespace Subscription {

  export function isValid(value: string): boolean {
    return data.some(d => d.value === value);
  }

  export function getId(value: Subscription): number {
    const item: SubscriptionDataItem = data.find(i => i.value === value);
    return item ? item.id : null;
  }

  export function pagesLimit(sub: Subscription): number {
    const d: SubscriptionDataItem = data.find(item => item.value === sub);
    return d ? d.pagesLimit : 0;
  }

  interface SubscriptionDataItem {
    value: Subscription;
    id: number;
    pagesLimit: number;
  }

  const data: SubscriptionDataItem[] = [
    { value: Subscription.essential, id: 700538, pagesLimit: 9 },
    { value: Subscription.basic, id: 700537, pagesLimit: 3 },
  ];
}