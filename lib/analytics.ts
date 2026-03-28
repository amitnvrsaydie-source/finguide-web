import { track } from '@vercel/analytics'

export const analytics = {
  // Advisor profile viewed
  advisorViewed: (advisorId: number, advisorName: string, city: string) =>
    track('advisor_viewed', { advisor_id: advisorId, advisor_name: advisorName, city }),

  // Booking funnel
  bookingStarted: (advisorId: string, advisorName: string) =>
    track('booking_started', { advisor_id: advisorId, advisor_name: advisorName }),

  bookingCompleted: (advisorId: string, advisorName: string, mode: string, service: string) =>
    track('booking_completed', { advisor_id: advisorId, advisor_name: advisorName, mode, service }),

  // Advisor listing interactions
  filterSelected: (filter: string) =>
    track('filter_selected', { filter }),

  advisorCardClicked: (advisorId: number, advisorName: string) =>
    track('advisor_card_clicked', { advisor_id: advisorId, advisor_name: advisorName }),

  // CTA interactions
  ctaClicked: (cta: string, page: string) =>
    track('cta_clicked', { cta, page }),
}
