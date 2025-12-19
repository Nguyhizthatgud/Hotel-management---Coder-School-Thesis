
import i18n from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import { initReactI18next } from "react-i18next";
i18n.use(LanguageDetector).use(initReactI18next).init({
    debug: true,
    resources: {
        en: {
            translation: {
                navbar1: "Features",
                navbar2: "Pricing",
                login: "Login",
                signup: "Sign Up",
                logout: "Logout",
                username: "Username",
                password: "Password",
                email: "Email",
                submit: "Submit",
                cancel: "Cancel",
                dashboard: "Dashboard",
                profile: "Profile",
                settings: "Settings",
                headingPad_line1: "#1 the best support tool for hotel and motel owners ",
                posterText_line1: "Create a free property management interface and",
                posterText_line2: "support",
                posterText_line3: "direct",
                typedStrings_1: "control",
                typedStrings_2: "manage",
                typedStrings_3: "monitor",
                posterText_disclaimer1: "* No credit card required. No hidden fees. Cancel anytime.",
                posterText_disclaimer2: "* All features are free for the first 30 days.",
                posterText_partners: "OTA Partners",
                posterText_partnersDesc: "We are proud to partner with leading partners in the tourism industry.",
            }
        },
        vi: {
            translation: {
                navbar1: "Tính Năng",
                navbar2: "Giá Dịch Vụ",
                login: "Đăng nhập",
                signup: "Đăng ký",
                logout: "Đăng xuất",
                username: "Tên đăng nhập",
                password: "Mật khẩu",
                email: "Email",
                submit: "Gửi",
                cancel: "Hủy",
                dashboard: "Lễ Tân",
                profile: "Hồ Sơ",
                settings: "Cài Đặt",
                headingPad_line1: "#1 công cụ hỗ trợ tốt nhất cho chủ khách sạn và nhà nghỉ ",
                posterText_line1: "Tạo giao diện quản lý tài sản miễn phí và",
                posterText_line2: "hỗ trợ",
                posterText_line3: "trực tiếp",
                typedStrings_1: "vận hành",
                typedStrings_2: "quản lý",
                typedStrings_3: "giám sát",
                posterText_disclaimer1: "* Không cần thẻ tín dụng. Không có phí ẩn. Hủy bất cứ lúc nào.",
                posterText_disclaimer2: "* Tất cả các tính năng đều miễn phí trong 30 ngày đầu tiên.",
                posterText_partners: "Các đối tác OTA",
                posterText_partnersDesc: "Chúng tôi tự hào hợp tác với các đối tác hàng đầu trong ngành công nghiệp du lịch."


            }
        },
        cn: {
            translation: {
                navbar1: "特点",
                navbar2: "价格",
                login: "登录",
                signup: "注册",
                logout: "登出",
                username: "用户名",
                password: "密码",
                email: "电子邮件",
                submit: "提交",
                cancel: "取消",
                dashboard: "仪表板",
                profile: "个人资料",
                settings: "设置",
                headingPad_line1: "＃1 最适合酒店和汽车旅馆业主的支持工具",
                posterText_line1: "创建免费的物业管理界面并",
                posterText_line2: "支持",
                posterText_line3: "直接",
                typedStrings_1: "控制",
                typedStrings_2: "管理",
                typedStrings_3: "监控",
                posterText_disclaimer1: "* 无需信用卡。无隐藏费用。随时取消。",
                posterText_disclaimer2: "* 前30天所有功能均免费。",
                posterText_partners: "OTA合作伙伴",
                posterText_partnersDesc: "我们很荣幸与旅游业的领先合作伙伴合作。",
            }
        }
    },

    lng: "vi", // default language
    fallbackLng: "en",
    returnObjects: true,
    interpolation: {
        escapeValue: false // react already safes from xss
    }
});
export default i18n;  
