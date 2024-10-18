export interface detallePedidoModel {
    id? : number;
    id_pedido : number;
    codigo_art : string;
    descripcion : string;
    cantidad : number;
    und : string;
    valor :number;
    iva : number;
    subtotal : number;
    total : number;
    cuenta : string;
    tVida? : number;
}