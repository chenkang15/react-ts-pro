/**
 * ''Inc.
 * All rights reserved.
 *
 *''
 *
 * @file The class of Progress
 */

import NProgress from 'nprogress';
import 'nprogress/nprogress.css';

NProgress.configure({ showSpinner: false });

export default abstract class Progress {

    private static requestCount: number = 0;

    /**
     * @static
     * 请求进度条开始加载�?
     */
    public static start(): void {
        ++Progress.requestCount;
        if (Progress.requestCount === 1) { // 第一个请求开始时，进度条开始加载�?
            NProgress.start();
        }
    }

    /**
     * @static
     * 请求进度条加载结束�?
     */
    public static done(): void {
        --Progress.requestCount;
        NProgress.inc(NProgress.status + 0.1);
        if (Progress.requestCount === 0) { // 所有请求全部完成后，进度条才加载完成�?
            NProgress.done();
        }
    }
}
