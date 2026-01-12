const URL_BASE = '/api/v1';

/**
 * APIレスポンスステータスコード
 */
export const API_STATUS_CODE = {
  HTTP_200_OK: 200, // 処理成功
  HTTP_201_CREATED: 201, // 生成成功
  HTTP_204_NO_CONTENT: 204, // 生成成功
  HTTP_400_BAD_REQUEST: 400, // リクエスト値に誤りがある場合、validationにひっかかる場合
  HTTP_401_UNAUTHORIZED: 401, // headerのアクセストークンが不正な場合
  HTTP_403_FORBIDDEN: 403, // 権限がない場合、編集権限がないユーザーによる削除処理要求など
  HTTP_404_NOT_FOUND: 404, // リソースが存在しない場合、存在しないIDを指定された場合など
  HTTP_422_UNPROCESSABLE_ENTITY: 422, // バリデーションエラーに対して応答
  HTTP_500_INTERNAL_SERVER_ERROR: 500, // 処理中に致命的なエラーが発生した場合、タイムアウト
};

export const API_URL = {
  HOME_PAGE: `${URL_BASE}/Recipe/HomePageInfo`,
  CATEGORY: `${URL_BASE}/category`, 
};