import { baseApi } from '@/app/api'
import {
  RequestSubscription,
  ResponseCostPayment,
  ResponseCurrentPayment,
  ResponseMyPayments,
  ResponseSubscription,
} from '@/features'
import { API_URLS, METHOD } from '@/shared/config'

const { POST } = METHOD

const {
  CANCEL_AUTO_RENEWAL,
  CREATE_SUBSCRIPTIONS,
  GET_MY_PAYMENTS,
  GET_SUBSCRIPTIONS_COST_PAYMENT,
  GET_SUBSCRIPTIONS_CURRENT_PAYMENT,
} = API_URLS.SUBSCRIPTIONS

export const subscriptionsApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    /**
     * Cancel the auto-renewal of the user's subscription.
     */
    cancelAutoRenewal: builder.mutation<void, void>({
      invalidatesTags: ['Subscriptions'],
      query: () => ({
        method: POST,
        url: CANCEL_AUTO_RENEWAL,
      }),
    }),
    /**
     * Create a new subscription.
     * @param {RequestSubscription} params - The subscription details.
     * @returns {Promise<ResponseSubscription>} The response containing the new subscription details.
     */
    createSubscription: builder.mutation<ResponseSubscription, RequestSubscription>({
      invalidatesTags: ['Subscriptions'],
      query: params => ({
        body: params,
        method: POST,
        url: CREATE_SUBSCRIPTIONS,
      }),
    }),
    /**
     * Fetch the cost of available subscription payments.
     * @returns {Promise<ResponseCostPayment>} The cost of available subscription payments.
     */
    getCostPayment: builder.query<ResponseCostPayment, void>({
      providesTags: ['Subscriptions'],
      query: () => GET_SUBSCRIPTIONS_COST_PAYMENT,
    }),
    /**
     * Fetch the user's current subscription payment.
     * @returns {Promise<ResponseCurrentPayment>} The user's current subscription payment details.
     */
    getCurrentPayment: builder.query<ResponseCurrentPayment, void>({
      providesTags: ['Subscriptions'],
      query: () => GET_SUBSCRIPTIONS_CURRENT_PAYMENT,
    }),
    /**
     * Fetch the user's payment history.
     * @returns {Promise<ResponseMyPayments>} The user's payment history.
     */
    getMyPayments: builder.query<ResponseMyPayments, void>({
      providesTags: ['Subscriptions'],
      query: () => GET_MY_PAYMENTS,
    }),
  }),
})

export const {
  useCancelAutoRenewalMutation,
  useCreateSubscriptionMutation,
  useGetCostPaymentQuery,
  useGetCurrentPaymentQuery,
  useGetMyPaymentsQuery,
} = subscriptionsApi
