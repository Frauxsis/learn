import count from './js/count';
import sum from './js/sum';
import { mul } from './js/math';
//想要webpack打包资源，必须引入该资源
import './css/index.css';
import './less/index.less';

console.log(mul(3, 3));
console.log(count(2, 1));
console.log(sum(1, 2, 3, 4));
