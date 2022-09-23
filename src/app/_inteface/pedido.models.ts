

export interface pedidosModel{
    id? : number;
    nro_pedido? : number;
    fecha : Date;
    usuario : string;
    proveedor : string; 
    ccosto : string
    justificacion : string;
    vlr_total? : string;
    vto_bueno_presu? : number;
    fecha_vto_bueno? : Date;
    vto_bueno_finan? : number;
    fecha_vto_finan? : Date;        
    estado : string;
    nro_srp? : number;
    nro_rp? : number;
    nro_contrato : string;
    obs_compras? : string;
    pc? : string;
    st? : string;
    et? : string;
    cont? : string;
    ad? : string; 
    asignado_a :string;
    aprobado_jefe? : string;
}