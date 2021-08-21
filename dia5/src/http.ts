type ErrorPayload = {
  error: true
  message: string
}

const request = <T>(
  url: RequestInfo,
  options?: RequestInit
): Promise<(T & Partial<ErrorPayload>) | (ErrorPayload & Partial<T>)> =>
  fetch(url, options)
    .then(r => r.json())
    .catch(e => ({ error: true, message: e.message }))

const createRequest =
  (method: string) =>
  <T extends any = {}>(url: RequestInfo, data: unknown) =>
    request<T>(url, {
      method,
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify(data),
    })

export const get = <T>(url: RequestInfo) => request<T>(url)
export const post = createRequest('POST')
export const del = createRequest('DELETE')
