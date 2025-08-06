# Configuración de Integración con Google Sheets

Esta guía te ayudará a configurar la integración con Google Sheets para registrar automáticamente todas las solicitudes de cotización.

## 📋 Qué se registra:
- Fecha y hora (zona horaria de Argentina)
- Nombre del Cliente
- Número de Teléfono
- Email
- Descripción del Proyecto
- Estado (siempre "Nuevo" inicialmente)

## 🔧 Pasos de Configuración:

### 1. Crear Hoja de Cálculo de Google
1. Ve a [Google Sheets](https://sheets.google.com)
2. Crea una nueva hoja de cálculo
3. Nómbrala "Cotizaciones NG Ingeniería" (o cualquier nombre que prefieras)
4. Crea una hoja llamada "Cotizaciones" con estos encabezados en la fila 1:
   - A1: `Fecha`
   - B1: `Nombre`
   - C1: `Teléfono`
   - D1: `Email`
   - E1: `Proyecto`
   - F1: `Estado`
5. Copia el ID de la hoja de cálculo desde la URL:
   `https://docs.google.com/spreadsheets/d/SPREADSHEET_ID/edit`

### 2. Crear Cuenta de Servicio de Google Cloud
1. Ve a [Google Cloud Console](https://console.cloud.google.com/)
2. Crea un nuevo proyecto o selecciona uno existente
3. Habilita la API de Google Sheets:
   - Ve a "APIs y Servicios" > "Biblioteca"
   - Busca "Google Sheets API"
   - Haz clic en "Habilitar"

### 3. Crear Credenciales de Cuenta de Servicio
1. Ve a "APIs y Servicios" > "Credenciales"
2. Haz clic en "Crear credenciales" > "Cuenta de servicio"
3. Completa los detalles:
   - Nombre: `ng-ingenieria-sheets`
   - Descripción: `Cuenta de servicio para formulario de contacto NG Ingeniería`
4. Haz clic en "Crear y Continuar"
5. Omite la asignación de roles (haz clic en "Continuar")
6. Haz clic en "Listo"

### 4. Generar Clave Privada
1. Haz clic en la cuenta de servicio creada
2. Ve a la pestaña "Claves"
3. Haz clic en "Agregar Clave" > "Crear Nueva Clave"
4. Selecciona formato "JSON"
5. Descarga el archivo JSON

### 5. Compartir Hoja de Cálculo con la Cuenta de Servicio
1. Abre tu Hoja de Cálculo de Google
2. Haz clic en el botón "Compartir"
3. Agrega el email de la cuenta de servicio (encontrado en el archivo JSON como `client_email`)
4. Dale permisos de "Editor"
5. Desmarca "Notificar a las personas" y haz clic en "Compartir"

### 6. Configurar Variables de Entorno
Del archivo JSON descargado, extrae estos valores y agrégalos a `.env.local`:

```env
GOOGLE_SHEETS_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nTU_CLAVE_PRIVADA_AQUI\n-----END PRIVATE KEY-----"
GOOGLE_SHEETS_CLIENT_EMAIL=tu-cuenta-servicio@project-id.iam.gserviceaccount.com
GOOGLE_SHEETS_ID=tu-id-de-hoja-de-calculo-del-paso-1
```

**Notas Importantes:**
- La clave privada debe incluir la clave completa con `-----BEGIN PRIVATE KEY-----` y `-----END PRIVATE KEY-----`
- Reemplaza `\n` con saltos de línea reales en la clave privada
- El ID de la hoja de cálculo es la cadena larga en la URL de Google Sheets

## 🧪 Pruebas
Después de la configuración, envía un formulario de prueba. Deberías ver:
1. Dos emails enviados (al propietario y al cliente)
2. Una nueva fila agregada a tu Hoja de Cálculo de Google
3. Logs en la consola confirmando que la integración funcionó

## 🚨 Solución de Problemas
- **Permiso denegado**: Asegúrate de haber compartido la hoja de cálculo con el email de la cuenta de servicio
- **Credenciales inválidas**: Verifica que la clave privada y el email del cliente sean correctos
- **Hoja no encontrada**: Verifica el ID de la hoja de cálculo y el nombre de la hoja ("Cotizaciones")
- **API no habilitada**: Asegúrate de que la API de Google Sheets esté habilitada en tu proyecto

La integración está diseñada para fallar de manera elegante - si la configuración de Google Sheets está incompleta, los emails se seguirán enviando exitosamente.