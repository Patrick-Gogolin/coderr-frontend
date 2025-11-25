const GUEST_LOGINS = {
    customer : {
        username: 'andrey',
        password: 'asdasd'
    },
    business : {
        username: 'kevin',
        password: 'asdasd24'
    }
}

const API_BASE_URL = 'http://127.0.0.1:8000/api/';
const STATIC_BASE_URL = 'http://127.0.0.1:8000/';


const FRONTEND_BASE_URL = 'http://127.0.0.1:5500/coderr/';

//const API_BASE_URL = 'https://coderr.patrick-gogolin.de/api/';
//const STATIC_BASE_URL = 'https://coderr.patrick-gogolin.de/';


const LOGIN_URL = 'login/';

const REGISTER_URL = 'registration/';

const PROFILE_URL = 'profile/';

const FORGET_PASSWORD_URL = 'password_reset/';

const BUSINESS_PROFILES_URL = 'profiles/business/';

const CUSTOMER_PROFILES_URL = 'profiles/customer/';

const REVIEW_URL = 'reviews/';

const ORDER_URL = 'orders/';

const OFFER_URL = 'offers/';

const OFFER_DETAIL_URL = 'offerdetails/';

const BASE_INFO_URL = 'base-info/';

const OFFER_INPROGRESS_COUNT_URL = 'order-count/';
const OFFER_COMPLETED_COUNT_URL = 'completed-order-count/';

const PAGE_SIZE = 6

/**
 * Predefined messages for different activation states (e.g., loading, success, error).
 *
 * @type {{
 *   processing: {icon: string, title: string, text: string},
 *   success: {icon: string, title: string, text: string},
 *   error: {icon: string, title: string, text: string}
 * }}
 */
const ACTIVATION_MESSAGES = {
    processing: {
        icon: '',
        title: 'Processing...',
        text: 'Please wait while we process your request.'
    },
    success: {
        icon: '<img src="./assets/icons/check.svg" alt="Success" width="28" height="28">',
        title: 'Success!',
        text: 'Operation completed successfully!'
    },
    error: {
        icon: '<img style="background:red" src="./assets/icons/error.svg" alt="Error" width="28" height="28">',
        title: 'Error!',
        text: 'Something went wrong.'
    }
}