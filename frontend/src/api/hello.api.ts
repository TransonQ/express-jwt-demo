import { ax } from './ax.instance';

export function getHello() {
  return ax.get('/');
}
