export interface liq_comision_supervisor_pap {
    id: number,
    mes_comision: number,
    periodo: string,
    codigo_tipo_esquema: number,
    nombre_esquema : string,
    cedula_supervisor: string,
    nombre_supervisor : string,
    numero_meta_ftth: number,
    numero_cumplimiento_asesor_ftth: number,
    porcentaje_cumplimiento_asesor_ftth: string,
    homologa_porcentaje_ftth: number,
    peso_cumpliento_ftth: string,
    homologa_peso_ftth: number
    numero_meta_movil: number,
    numero_cumpliento_asesor_movil: number,
    porcentaje_cumplimiento_asesor_movil: string,
    homologa_porcentaje_movil: number,
    peso_cumplimiento_movil: string
    homolog_peso_movil: number,
    
    comision: number,
    factor_acelearion_desaceleracion: string,
    homologa_factor_aceleracion_desaceleracion: number,
    total_comision: number,
    total_porcentaje_cumplimiento: string,
    total_homologa_cumplimiento: number,
    aceleracion_desaceleracion: string
}