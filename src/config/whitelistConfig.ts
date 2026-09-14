/**
 * Whitelist Configuration & Google Sheets Integration
 * 
 * You can insert your Google Sheet Webhook URL and X (Twitter) links below.
 */

// 1. Google Sheets Webhook URL:
// Leave empty for now, insert your Google Apps Script Web App URL here when ready.
// Example: "https://script.google.com/macros/s/AKfycbx.../exec"
export const GOOGLE_SHEET_WEBHOOK_URL: string = 'https://script.google.com/macros/s/AKfycbyIQNkD5G-AcaTNgEAo3IIpx6oLku-YcSFPhXFFQhSTIwGKzKCDmH6ooigqPWC4DNDf/exec';

// 2. Official X (Twitter) Profile Link:
// Insert your account link here later. Clicking @RattyOnHood will open this link.
export const X_FOLLOW_URL: string = 'https://x.com/RattyOnHood';

// 3. Official Pinned Announcement Post Link:
// Insert your pinned tweet link here later.
export const X_POST_URL: string = 'https://x.com/';

// 4. OpenSea Drop Configuration:
// >>> TO UNLOCK BUTTONS: Change OPENSEA_DROP_ENABLED to true <<<
// When false: Buttons appear blurred and locked with a "Drop Locked / Soon" state.
// When true: Buttons become fully clickable and link to OPENSEA_DROP_URL.
export const OPENSEA_DROP_ENABLED: boolean = false;

// Insert your official OpenSea Drop / Collection link here:
export const OPENSEA_DROP_URL: string = 'https://opensea.io';

/**
 * Sends whitelist registration data to your connected Google Sheet.
 * If GOOGLE_SHEET_WEBHOOK_URL is not set yet, it safely saves locally and logs to console.
 */
export async function sendWhitelistToGoogleSheet(data: {
  wallet?: string;
  xHandle?: string;
  action: 'save_wallet' | 'save_handle' | 'confirm_whitelist';
  completedSteps?: number;
  timestamp?: string;
}): Promise<{ success: boolean; message: string; localOnly?: boolean }> {
  const payload = {
    ...data,
    timestamp: data.timestamp || new Date().toISOString(),
  };

  // If URL is not provided yet, fallback gracefully to local storage
  if (!GOOGLE_SHEET_WEBHOOK_URL || GOOGLE_SHEET_WEBHOOK_URL.trim() === '') {
    console.info('[Google Sheet Sync] Webhook URL not set yet. Stored locally:', payload);
    return {
      success: true,
      localOnly: true,
      message: 'Saved locally! (Connect your Google Sheet Webhook URL to enable cloud synchronization).',
    };
  }

  try {
    // Google Apps Script Web App requires POST with JSON string
    // mode: 'no-cors' allows submission without CORS blocking in browsers
    await fetch(GOOGLE_SHEET_WEBHOOK_URL.trim(), {
      method: 'POST',
      mode: 'no-cors',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    return {
      success: true,
      message: 'Successfully synchronized to Google Sheet!',
    };
  } catch (error) {
    console.error('[Google Sheet Sync] Error submitting data:', error);
    return {
      success: false,
      message: 'Could not sync with Google Sheet. Please check your webhook URL.',
    };
  }
}
