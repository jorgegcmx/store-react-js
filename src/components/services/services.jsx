import axios from "axios";

export function getProducts() {
  const url = "https://tucatalogoweb.com/venta/admin/articulos/api_checuan.php";
  const promise = axios.get(url);
  const dataPromise = promise.then((response) => response.data);
  return dataPromise;
}

export function getCountrie() {
  const url =
    "https://tucatalogoweb.com/venta/admin/view_clientes/services/getCountrie.php";
  const promise = axios.get(url);
  const dataPromise = promise.then((response) => response.data);
  return dataPromise;
}

export function sendPay(preference) {
  const url =
    "https://tucatalogoweb.com/venta/admin/view_clientes/services/ventasevice.php";
  const promise = axios.post(url, preference);
  const dataPromise = promise.then((response) => response.data);
  return dataPromise;
}

export function savedSale(venta) {
  const url = "https://tucatalogoweb.com/venta/admin/pedidos/saveSale.php";
  const promise = axios.post(url, venta);
  const dataPromise = promise.then((response) => response.data);
  return dataPromise;
}
