import { useEffect } from 'react'

const GoogleAnalytics = () => {
  useEffect(() => {
    // Replace "GA_MEASUREMENT_ID" with your Google Analytics Measurement ID
    const gaMeasurementId = 'J2FCEQRZJ1'

    // Initialize Google Analytics tracking
    window.dataLayer = window.dataLayer || []
    function gtag() { dataLayer.push(arguments) }
    window.gtag = gtag
    gtag('js', new Date())
    gtag('config', gaMeasurementId, { anonymize_ip: true })

    // Check if the user has provided consent for Google Analytics tracking
    const consent = localStorage.getItem('googleAnalyticsConsent')
    if (consent === 'granted') {
      // Enable Google Analytics tracking if consent has been granted
      gtag('consent', 'update', {
        analytics_storage: 'granted'
      })
    } else if (consent === 'denied') {
      // Disable Google Analytics tracking if consent has been denied
      gtag('consent', 'update', {
        analytics_storage: 'denied'
      })
    }
  }, [])

  return null
}

export default GoogleAnalytics