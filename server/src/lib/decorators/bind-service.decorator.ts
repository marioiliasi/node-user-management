import { Container } from 'typescript-ioc';

export function BindService(constructor: any) {
  Container.bindName(constructor.name).to(new constructor());
}
