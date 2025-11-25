function initActivation() {
    activateAccount();
}

/**
 * Extracts `uid` and `token` parameters from the current page URL.
 *
 * @function extractParams
 * @returns {{uid: string, token: string} | null} - The extracted parameters or null if missing.
 */
function extractParams() {
    const urlParams = new URLSearchParams(window.location.search);
    const uid = urlParams.get('uid');
    const token = urlParams.get('token');

    if (uid && token) {
        return {uid, token};
    }
    return null;
}

/**
 * Sends the activation request using URL parameters (uid, token).
 */
async function activateAccount() {
    const params = extractActivationParams();
    if (!params) {
         window.location.href = FRONTEND_BASE_URL + 'index.html';
         return;
    }
    updateActivationContent('processing');
    
    try {
        const result = await processActivation(params);
        handleActivationSuccess(result);
        redirectToDestinationBasedOnActivationStatus('login.html');
    } catch (error) {
       handleActivationError(error);
       redirectToDestinationBasedOnActivationStatus('index.html');
    }
}

/**
 * Extracts activation parameters (uid and token) from URL.
 * Calls error handler if missing.
 *
 * @returns {{uid: string, token: string} | null}
 */
function extractActivationParams() {
    const {uid, token} = extractParams() || {};
    if (!uid || !token) {
        return null;
    }
    return {uid, token};
}

/**
 * Sends a GET request to activate the account.
 *
 * @param {{uid: string, token: string}} params - Activation parameters.
 * @returns {Promise<Object>} The parsed server response.
 */
async function processActivation({uid, token}) {
    const response = await sendActivationRequest(uid, token);
    const result = await response.json();

    if (!response.ok) {
        throw new Error(result.error || "Activation failed");
    }
    return result;
}

/**
 * Sends a GET request to the API, optionally with activation parameters.
 * @param {string} [uid] - User ID for account activation.
 * @param {string} [token] - Token for account activation.
 * @returns {Promise<Response>} Fetch response object.
 */
async function sendActivationRequest(uid, token) {
    const endpoint = `activate/${uid}/${token}/`;

    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
        credentials: 'include',
    });
    return response;
}

/**
 * Handles a successful account activation.
 *
 * @param {Object} result - The success response from the server.
 */
function handleActivationSuccess(result) {
    const message = result.message || "Account successfully activated!";
    updateActivationContent('success', message);
    //showToastAndRedirect(false, [message], ACTIVATION_CONFIG.loginUrl, ACTIVATION_CONFIG.successDelay);
}

/**
 * Handles an activation error, including display and redirect.
 *
 * @param {string | Error} error - The error object or message.
 */
function handleActivationError(error) {
    const message = typeof error === 'string' ? error : 'Something went wrong during activation !';
    updateActivationContent('error', message);
    //showToastAndRedirect(true, [message], ACTIVATION_CONFIG.loginUrl, ACTIVATION_CONFIG.errorDelay);
}

/**
 * Updates the DOM with content corresponding to the activation status.
 *
 * @param {"processing" | "success" | "error"} status - Activation status.
 * @param {string} [customMessage] - Optional custom message to display.
 */
function updateActivationContent(status, customMessage = '') {
    const activationContent = document.getElementById('activation_content');
    if (!activationContent) return;

    const content = getActivationContent(status, customMessage);
    activationContent.innerHTML = buildActivationHTML(content, status);
}

/**
 * Returns the content object (icon, title, text) based on activation status.
 *
 * @param {"processing" | "success" | "error"} status - Activation status.
 * @param {string} customMessage - Optional override for text message.
 * @returns {{icon: string, title: string, text: string}}
 */
function getActivationContent(status, customMessage) {
    const baseContent = ACTIVATION_MESSAGES[status];
    return {
        ...baseContent,
        text: customMessage || baseContent.text
    };
}

/**
 * Builds the HTML string for the activation content section.
 *
 * @param {{icon: string, title: string, text: string}} content - Activation content data.
 * @param {"processing" | "success" | "error"} status - Activation status.
 * @returns {string} HTML string to inject.
 */
function buildActivationHTML({icon, title, text}, status) {
    const redirectMessage = status === 'success'
        ? '<p class="text_a_c font_prime_color">Redirecting to login...</p>'
        : status === 'error'
        ? '<p class="text_a_c font_prime_color">Redirecting to homepage...</p>'
        : '';
        
    const titleClass = status === 'success' ? 'activation-success-text' :
        status === 'error' ? 'font_error_color' : 'font_prime_color';

    return `
        <h1 style="display:flex; align-items:center; gap:0.25em" class="${titleClass} d_flex_cs_gl w_full">${icon} ${title}</h1>
        <p class="text_a_c font_prime_color">${text}</p>
        ${redirectMessage}
    `;
}

/**
 * Handles the "forgot password" form submission.
 * Sends reset email request.
 *
 * @param {Event} event - The form submission event.
 */
async function forgotPasswordSubmit(event) {
    event.preventDefault();
    //setError(false, "forgot_email_group");
    const data = getFormData(event.target);
    await forgetPassword(data);
}

/**
 * Sends a password reset request with the given data.
 *
 * @param {Object} data - The email or credentials for password reset.
 */
async function forgetPassword(data) {
    let response = await postData(FORGET_PASSWORD_URL, data);
    if (!response.ok) {
        //setError(true, "forgot_email_group");
        //let errorArr = extractErrorMessages(response.data);
        //showToastMessage(true, errorArr);
        console.log(response.data, response.ok);
    } else {
        //showToastAndRedirect(false, ["Password reset email sent! Please check your inbox."], "../auth/login.html", TOAST_DURATION);
        console.log(response.data);
    }
}
//test