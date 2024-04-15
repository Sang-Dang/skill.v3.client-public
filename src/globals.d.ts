// #region devlog
const _global = (window /* browser */ || global) /* node */ as any;
declare global {
    function devLog(...msg: any[]): void;
    type SuccessResponse<T> = {
        data: T;
        message: string;
        statusCode: 200 | 201 | 204;
    };
    type ErrorResponse = {
        message: any;
        statusCode: number;
    };
    type ApiResponse<T> = SuccessResponse<T> | ErrorResponse;
    type UpdateResponse = {
        generatedMaps: any[];
        raw: any[];
        affected: number;
    };
}
_global.devLog = function (...msg: any[]) {
    if (import.meta.env.MODE === 'development') {
        console.log('%c[DEV MODE]', 'font-weight: bold; color: red;', ...msg);
    }
};
// #endregion
