import axios from 'axios';
import { wrapper } from 'axios-cookiejar-support';
import { CookieJar } from 'tough-cookie';
import { TIMING } from '@utils/constants';

const jar = new CookieJar();

export const apiClient = wrapper(
  axios.create({
    timeout: TIMING.API_TIMEOUT,
    headers: {
      'User-Agent':
        'Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Mobile/15E148 Safari/604.1',
      Accept:
        'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
      'Accept-Language': 'en-us',
    },
    jar,
    withCredentials: true,
  })
);

export function resetCookieJar(): void {
  jar.removeAllCookiesSync();
}

export { jar };
