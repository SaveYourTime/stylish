function get(api) {
  return new Promise(async (resolve, reject) => {
    const host = 'api.appworks-school.tw';
    const response = await fetch(`https://${host}/api/1.0${api}`);
    const data = response.json();
    resolve(data);
  });
}

function post(api, body) {
  const headers = new Headers({
    'Content-Type': 'application/json'
  });
  const fb = getStorage('fb');
  if (fb) {
    const { auth } = fb;
    if (auth !== undefined && auth.accessToken !== "") {
      headers.append('Authorization', `Bearer ${auth.accessToken}`);
    }
  }
  const options = {
    method: 'POST',
    headers,
    withCredentials: true,
    body: JSON.stringify(body),
  };
  const host = 'api.appworks-school.tw';
  const url = `https://${host}/api/1.0${api}`;
  const request = new Request(url, options);

  return new Promise(async (resolve, reject) => {
    const response = await fetch(request);
    const data = response.json();
    resolve(data);
  });
}

function getMarketingCampaigns() {
  const endPoint = '/marketing/campaigns';
  return get(endPoint);
}

function getMarketingHots() {
  const endPoint = '/marketing/hots';
  return get(endPoint);
}

function getProducts(category = 'all', paging = 0) {
  const endPoint = `/products/${category}?paging=${paging}`;
  return get(endPoint);
}

function searchProducts(keyword, paging = 0) {
  const endPoint = `/products/search?keyword=${keyword}&paging=${paging}`;
  return get(endPoint);
}

function getProduct(id) {
  const endPoint = `/products/details?id=${id}`;
  return get(endPoint);
}

function orderCheckout(order) {
  const endPoint = `/order/checkout`;
  return post(endPoint, order);
}