---
source: https://www.hannonhill.com/cascadecms/latest/cascade-administration/connectors/how-to-set-up-a-google-analytics-connector.html
title: Google Analytics Connector - Cascade CMS Knowledge Base
category: general
scraped: 2026-02-16
version: cascade-cms-latest
---

main{ display: flex; flex-direction: column; gap: 1em; }

Connectors and Integrations

# Overview[](#Overview)

The Google Analytics Connector syncs data from your Google Analytics account with Cascade CMS to provide users with basic analytics information for Sites, Pages, Files, and Folders. Site analytics data is available through a [Dashboard widget](https://www.hannonhill.com/cascadecms/latest/cascade-basics/the-dashboard.html), the Google Analytics Statistics report, and by viewing **More > Analytics** when viewing any of the Site, Page, File, or Folder asset types.

# Creating a Google Analytics Connector[](#CreatingaGoogleAnalyticsConnector)

To create a Google Analytics Connector:

1.  Navigate to  **Manage Site** > **Connectors**.
2.  Navigate to the container in which the new Connector will be stored, or create a new container using  **Add** >  **Container**.
3.  Click  **Add** >  **Connector**.
4.  Select  **Google Analytics** and then click **Choose**.
    -   If your selected site already has a Google Analytics Connector, you won't be able to add another unless you delete the existing Connector first.
5.  In the  **Name** field, enter the name for your Connector.
6.  In the  **Parent Container** field, select a container for your Connector, if desired.
7.  In the **View/Property ID** field enter the View/Property ID of the profile you wish to pull data from in Google Analytics. 
    
    **Note:** For Google Analytics 4, the **Property ID** is found in **Admin > Property Settings > Property Details**.  
    
8.  Optionally, enter a value for the **Base Path** field.
    -   The Base Path is a path segment that is removed from URLs imported from Google Analytics to help Cascade determine which asset corresponds to a particular URL.
    -   An example of when the Base Path could be used is when a site in Cascade corresponds to a sub-folder off of a particular domain. For instance, an athletics-oriented site might be published to www.myuniversity.edu/athletics. In Cascade, there is no "athletics" folder because it is represented by a site. The URLs coming from Google Analytics, however, look like "/athletics/index.html".  In order for Cascade to be able to match the URL to a particular page inside Cascade, it would need to know that "/athletics" should be removed from the URL in order to successfully locate the matching Page "index".
9.  Click **Submit**.

# Google Analytics 4 data points[](#GoogleAnalytics4datapoints)

If you've been using the Connector to pull data from Universal Analytics, you'll notice a few differences in the data once you switch to Google Analytics 4.

Universal Analytics displayed Pageviews, Visits, Unique Pageviews, Average Time on Site, and Bounce Rate.

With Google Analytics 4, you'll see:

-   Views
-   Sessions
-   Users
-   Engagement Rate
-   Average Engagement Time

You can find more about [comparing metrics between Universal Analytics and Google Analytics 4 on the Google website](https://support.google.com/analytics/answer/11986666#bounce_rate_vs_engagement_rate&zippy=%2Cin-this-article).

# Google Analytics 4 and Universal Analytics[](#GoogleAnalytics4andUniversalAnalytics)

Cascade CMS currently supports Universal Analytics Views and Google Analytics 4 (GA4) properties. However, Universal Analytics properties and views are being [phased out](https://support.google.com/analytics/answer/10759417). Standard Universal Analytics properties will stop collecting data on July 1, 2023 while 360 Universal Analytics properties will stop collecting data on July 1, 2024. Google recommends switching to GA4 as soon as possible

## Switching your Connector to Google Analytics 4

You'll want to follow the [migration guide](https://support.google.com/analytics/answer/10759417#zippy=%2Cin-this-article) to get set up Google Analytics 4 and start collecting data as soon as possible. To help, Google will [automatically create a GA4 property](https://support.google.com/analytics/answer/12938611#zippy=%2Cin-this-article) for you.

Once you have a sufficient amount of data associated with the new Google Analytics 4, you can go ahead and switch to the GA4 version:

1.  Edit your existing Connector and update the View/Property ID field to reference the GA4
2.  Re-verify the Connector
3.  Either manually import data or wait for the scheduled data sync

# Verifying/Unverifying the Google Analytics Connector[](#VerifyingUnverifyingtheGoogleAnalyticsConnector)

To verify/unverify your Google Analytics Connector:

1.  While viewing (but not editing) the Connector, click **Verify**.
2.  A new link will appear that says **Click here to allow and "Verify" again**.
3.  The link will open a new window/tab to Google to grant Cascade access to the Google Analytics account.
4.  If you're not already logged in, enter the account credentials which have access to the profile.
5.  Copy the authentication token presented to you:  
    ![Google verification screen.](https://www.hannonhill.com/cascadecms/latest/cascade-administration/connectors/images/gaconnector-verify-token.png) 
6.  Now that a new access token for your Google Analytics connector has been generated, copy the token, go back to the Connector verification dialog, paste the token into the field and click the **Submit**.

Your Google Analytics connector is now enabled. To manually synchronize the analytics data, click the link labeled **Click to manually import analytics data**. Otherwise, no analytics data will be available until the next automatic synchronization which will occur at 1:30 am.

[↑](#top)

function toggleWidthAndIcon() { var element = document.getElementById("expand"); var icon = document.getElementById("iconToggle"); // Check if the content is currently full width if (element.classList.contains("width-full")) { // If yes, switch to "width" and update the icon to "expand" element.classList.remove("width-full"); element.classList.add("width"); icon.classList.remove('fa-down-left-and-up-right-to-center'); icon.classList.add('fa-up-right-and-down-left-from-center'); } else { // If not, switch to "width-full" and update the icon to "un-expand" element.classList.remove("width"); element.classList.add("width-full"); icon.classList.remove('fa-up-right-and-down-left-from-center'); icon.classList.add('fa-down-left-and-up-right-to-center'); } }