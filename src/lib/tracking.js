/**
 * Google Analytics utility functions with GDPR consent management
 */

export const GA_MEASUREMENT_ID = 'G-JBPZKM0Y6R';

/**
 * Check if gtag is available (not blocked by ad blockers)
 */
const isGtagAvailable = () => {
  return typeof window !== 'undefined' && typeof window.gtag === 'function';
};

/**
 * Grant analytics consent (called when user accepts cookies)
 */
export const grantAnalyticsConsent = () => {
  try {
    if (isGtagAvailable()) {
      window.gtag('consent', 'update', {
        'analytics_storage': 'granted'
      });
    }
    localStorage.setItem('analytics_consent', 'granted');
  } catch (error) {
    console.warn('Analytics consent grant failed:', error);
  }
};

/**
 * Deny analytics consent (called when user declines cookies)
 */
export const denyAnalyticsConsent = () => {
  try {
    if (isGtagAvailable()) {
      window.gtag('consent', 'update', {
        'analytics_storage': 'denied'
      });
    }
    localStorage.setItem('analytics_consent', 'denied');
  } catch (error) {
    console.warn('Analytics consent deny failed:', error);
  }
};

/**
 * Check if user has already given consent
 */
export const hasAnalyticsConsent = () => {
  try {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('analytics_consent') === 'granted';
    }
  } catch (error) {
    console.warn('Failed to check analytics consent:', error);
  }
  return false;
};

/**
 * Check if user has made a consent choice
 */
export const hasConsentChoice = () => {
  try {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('analytics_consent') !== null;
    }
  } catch (error) {
    console.warn('Failed to check consent choice:', error);
  }
  return false;
};

/**
 * Track page views
 * @param {string} url - The page URL
 * @param {string} title - The page title
 */
export const trackPageView = (url, title) => {
  try {
    if (isGtagAvailable()) {
      window.gtag('config', GA_MEASUREMENT_ID, {
        page_path: url,
        page_title: title,
      });
    }
  } catch (error) {
    // Silently fail if analytics is blocked
    console.debug('Page view tracking skipped (analytics blocked or unavailable)');
  }
};

/**
 * Track custom events
 * @param {string} action - The event action (e.g., 'click', 'submit', 'download')
 * @param {string} category - The event category (e.g., 'button', 'form', 'navigation')
 * @param {string} label - The event label (optional)
 * @param {number} value - The event value (optional)
 */
export const trackEvent = (action, category, label = '', value = null) => {
  try {
    if (isGtagAvailable()) {
      const eventParams = {
        event_category: category,
      };

      if (label) eventParams.event_label = label;
      if (value !== null) eventParams.value = value;

      window.gtag('event', action, eventParams);
    }
  } catch (error) {
    console.debug('Event tracking skipped (analytics blocked or unavailable)');
  }
};

/**
 * Track user conversions (e.g., sign-ups, purchases)
 * @param {string} conversionId - The conversion ID
 * @param {object} conversionData - Additional conversion data
 */
export const trackConversion = (conversionId, conversionData = {}) => {
  try {
    if (isGtagAvailable()) {
      window.gtag('event', 'conversion', {
        send_to: `${GA_MEASUREMENT_ID}/${conversionId}`,
        ...conversionData,
      });
    }
  } catch (error) {
    console.debug('Conversion tracking skipped (analytics blocked or unavailable)');
  }
};

/**
 * Track waitlist sign-ups specifically
 * @param {string} source - Where the user heard about HopLink
 * @param {string} role - Whether they're a rider or driver
 */
export const trackWaitlistSignup = (source, role) => {
  trackEvent('waitlist_signup', 'engagement', `source_${source}_role_${role}`);
};

/**
 * Track demo interactions
 * @param {string} action - The demo action (e.g., 'open', 'explore_rides', 'create_ride')
 */
export const trackDemoAction = (action) => {
  trackEvent(action, 'demo', action);
};
