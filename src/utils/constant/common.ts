import { NextRouter } from "next/router";

// リスト取得APIの1ページ当たりの取得件数
export const GET_LIST_LIMIT_COUNT = 20;

// テーブルの最大表示ページ数
export const TABLE_PAGE_MAX_COUNT = 5;

// 日付フォーマット
export const DATE_FORMAT = 'YYYY-MM-DD';
export const DATE_TIME_FORMAT = 'YYYY-MM-DD HH:mm:ss';
export const DATE_FORMAT_DISPLAY = 'YYYY年MM月DD日';
export const DATE_FORMAT_DISPLAY_ONE_DIGIT = 'YYYY年M月D日';
export const YEAR_MONTH_FORMAT_DISPLAY = 'YYYY年MM月';

export const CANCEL_REASON_MAX_LENGTH = 100;

export const DEVICE_CODE_CHECK_FLG = {
  INVALID: 1,
  ALREADY_USED: 2,
}

// 検査ステータス
export const STATUS_WAITING_EXAMINATION = "33";
export const STATUS_PROGRESS_EXAMINATION = "41";
export const STATUS_REGISTERED_EXAMINATION_RESULT_NDP = "50";
export const STATUS_COMPLETED_EXAMINATION = "51";
export const STATUS_DISABLED_PARTIALLY_EXAMINATION = "52";
export const STATUS_DISABLED_EXAMINATION = "53";
export const STATUS_CANCEL_EXAMINATION = "99";

export const invalidCancelStatuses = [
  STATUS_PROGRESS_EXAMINATION,
  STATUS_REGISTERED_EXAMINATION_RESULT_NDP,
  STATUS_COMPLETED_EXAMINATION,
  STATUS_DISABLED_PARTIALLY_EXAMINATION,
  STATUS_DISABLED_EXAMINATION,
  STATUS_CANCEL_EXAMINATION,
];

export const DATE_FORMAT_TO_JAPANESE = (dateString: string | number | Date): string => {
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const dayOfWeek = ["日", "月", "火", "水", "木", "金", "土"][date.getDay()];
  return `${year}年${month.toString().padStart(2, "0")}月${day.toString().padStart(2, "0")}日（${dayOfWeek}）`;
}

export const GENDER = [
  { value: '1', valueNm: '男性' },
  { value: '2', valueNm: '女性' },
]

export const DATE_FORMAT_WITH_WEEKDAY = (date: string | Date): string => {
  const weekdays = ["日", "月", "火", "水", "木", "金", "土"]; // Japanese weekdays
  const d = new Date(date);

  const year = d.getFullYear();
  const month = d.getMonth() + 1; // Months are 0-based in JavaScript
  const day = d.getDate();
  const weekday = weekdays[d.getDay()]; // Get the weekday (0 = Sunday, 1 = Monday, etc.)

  return `${year}年${month}月${day}日（${weekday}）`;
};

export const ENG_GENDER = [
  { value: '1', valueNm: 'Male' },
  { value: '2', valueNm: 'Female' },
]

export const JPN_LANGUAGE = "JPN";
export const ENG_LANGUAGE = "ENG";

/**
 * フロントエンドの各ページのURL管理
 */
export const PAGE_LIST = {
  // ユーザ
  USER: {
    ERROR: {
      ID: '/USR_ERROR',
      URL: '/error',
      AUTH: false,
    },
    REGISTER: {
      ID: '/USR_REGISTER',
      URL: '/register',
      AUTH: false,
    },
    PASSWORD_SET: {
        ID: "/USR_PASSWORD_SET",
        URL: "/password_setting",
        AUTH: false,
    },
    ENG: {
      HOME: {
        ID: 'USR_ENG_HOME',
        URL: '/en/home',
        AUTH: false,
      },
      REGISTER: {
        ID: 'USR_ENG_HOME',
        URL: '/en/register',
        AUTH: false,
      },
      QR_RESEND: {
        ID: 'USR_ENG_QR_RESEND',
        URL: '/en/qr_resend',
        AUTH: false,
      },
    },
    LOGIN: {
      ID: 'USR_LOGIN',
      URL: '/login',
      AUTH: false,
    },
    REQ_RESET_PASSWORD: {
      ID: 'USR_REQ_RESET_PASSWORD',
      URL: '/password_reset',
      AUTH: false,
    },
    RESETING_PASSWORD: {
      ID: 'USR_RESETTING_PASSWORD',
      URL: '/password_reset?q=re_setting',
      AUTH: false,
    },
    TOP: {
      ID: '/RECIPE_TOP',
      URL: '/',
      AUTH: false,
    },
    Category: {
      ID: '/RECIPE_CATEGORY',
      URL: '/add-recipe',
      AUTH: false,
    }
  },
};

/**
* バックエンド URL のリスト
*/
const USERS_URL_BASE = '/api/v1/user/users';
const URL_BASE = '/api/v1/user';

export const API_URL = {
  TERMS: `${URL_BASE}/register/terms`,
  PRIVACY: `${URL_BASE}/register/privacy`,
  CONSENT: `${URL_BASE}/examination/consent`,
  PRE_ENTRY: `${USERS_URL_BASE}/pre_entry`,
  VERIFY_PRE_ENTRY_AUTH_CODE: `${USERS_URL_BASE}/verify_pre_entry_auth_code`,
  RESEND_PRE_ENTRY_AUTH_CODE: `${USERS_URL_BASE}/resend_pre_entry_auth_code`,
  REGISTER: `${USERS_URL_BASE}`,
  RESEND_QR: `${USERS_URL_BASE}/qr_resend`,
  PASSWORD_SET: `${URL_BASE}/password_settings`,
  UPDATE_PASSWORD: `${URL_BASE}/profile_settings/change_password`,
  VERIFY_RESET_PASSWORD_TOKEN: `${URL_BASE}/password_settings/verify_reset_password_token`,
  REQUEST_RESET_PASSWORD: `${URL_BASE}/password_settings/request_reset_password`,
  RESET_PASSWORD: `${URL_BASE}/password_settings/reset_password`,
  PROFILE_CHANGE: `${URL_BASE}/change`,

  REQUEST_CHANGE_EMAIL: `${URL_BASE}/profile_settings/request_change_email`,
  CHANGE_EMAIL: `${URL_BASE}/profile_settings/change_email`,
  RESEND_EMAIL_AUTH_CODE: `${URL_BASE}/profile_settings/resend_email_auth_code`,
}

export const formatUserIdentifyForDisplay  = (userIdentify?: string)  => {
  if (!userIdentify) return "";

  return userIdentify.length <= 8 ? userIdentify : userIdentify?.substring(userIdentify.length - 8);
}

export function redirectToErrorPage(
  router: NextRouter,
  statusCode: number,
  message?: string,
  language?: string,
  clearState?: () => void
) {
  sessionStorage.clear();
  if (clearState) {
    clearState();
  }
  router.push({
    pathname: "/error",
    query: {
      status: statusCode,
      message: message || "",
      language: language
    },
  });
}

export const removeSuffixFromPrefecture = (prefecture: string) => {
  if (!prefecture) return "";
  return prefecture.replace(/(都|道|府|県)$/, "");
}

export const getDisorders = () => {
  return [
    "ビタミン K 欠乏症",
    "多発性骨髄腫",
    "抗リン脂質抗体症候群",
    "血友病 A",
    "アレルギー性紫斑病",
    "自己免疫性後天性凝固因子欠乏症",
    "第 IX 因子欠乏症（クリスマス病）",
    "第 XI 因子欠乏症（ロズェンタール症候群）",
    "フィブリノゲン欠乏症",
    "第 VII 因子欠乏症",
    "遺伝性第 X 因子欠乏症、自己免疫性後天性第 X 因子欠乏症",
    "自己免疫性後天性第 XIII 因子欠乏症、先天性第 XIII 因子欠乏症",
    "パラ血友病（遺伝性第 V 因子欠乏症）",
    "α ２ PI 欠乏症",
    "先天性第 V因子・第 VIII 因子複合欠乏症",
    "遺伝性プロトロンビン欠乏症、自己免疫性後天性プロトロンビン欠乏症",
    "先天性 PAI- I 欠乏症",
    "第 XII 因子欠乏症",
    "溶血性尿毒症症候群 (HUS)",
    "全身性エリテマトーデスで出血傾向がある患者",
    "肝硬変で出血傾向がある患者",
    "播種性血管内凝固症候群 (DIC)",
  ];
}

// アンケート
export const QUESTIONNAIRE = [
  {
    value: "インターネット検索",
    placeholder: "検索ワードを入力してください。",
    error: "検索ワードが必要です。",
  },
  {
    value: "その他",
    placeholder: "備考を入力してください。",
    error: "備考が必要です。",
  },
];
