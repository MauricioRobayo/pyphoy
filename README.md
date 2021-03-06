# ![pyphoy](https://www.pyphoy.com/imgs/pyphoy.svg) Pico y placa hoy

![build and release](https://github.com/MauricioRobayo/pyphoy/workflows/build%20and%20release/badge.svg)

El [pico y placa en Colombia](https://www.pyphoy.com) es una medida de restricción vehicular que se
aplica en las principales ciudades con el fin de descongestionar el tráfico
de automóviles en las vías.

Cada ciudad reglamenta la medida de acuerdo con sus necesidades y publica la
información en diferentes medios. Sin embargo, en muchos casos esta información
resulta de dificil acceso y consulta, por lo que el objectivo de [pyphoy](https://www.pyphoy.com) es mantener un fuente de información organizada, clara y estructurada sobre la medida del pico y placa.

## Recursos de la página

La información se encuentra estructurada por ciudades y cada ciudad implementa el pico y placa de acuerdo con categorías establecidas por la alcaldía correspondiente. Cada implementación de cada categoría del pico y placa aplica de acuerdo al número de la placa de los vehículos correspondientes a la categoría. De esta forma, los recursos disponibles en la página son:

    ciudad : categoría : número

### Ciudades

La información se encuentra agrupada por ciudades y para consultar una ciudad se usa la estructura `/{nombre-ciudad}`, por ejemplo, para consultar las categorías de pico y placa que aplican para Bogotá:

    https://www.pyphoy.com/bogota

Allí se enumera la información correspondiente a cada una de las categorías para las cuales aplica el pico y placa.

### Categorías

Para consultar una categoría la ruta se establece siguiendo el esquema `/{nombre-ciudad}/{nombre-categoria}`. Por ejemplo, para consultar el pico y placa para taxis en Medellín:

    https://www.pyphoy.com/medellin/taxis

La información por categoría muestra por defecto la información corresondiente a la fecha en que se hace la solicitud, y muestra la información correspondiente a esa fecha así como la información dos días atrás y la información seis días adelante.

#### Argumentos por categoría

La información por categoría se puede solicitar especificando una fecha en particular. Por ejemplo, si se desea consultar la información del pico y placa para particulares en Ibagué que aplicó el 27 de febrero de 2018, se haría de la siguiente forma:

    https://www.pyphoy.com/ibague/particulares?d=2018-02-27

El argumento `d` (fecha) debe ser dado en el formato `yyyy-mm-dd`. Si no se cuenta con la información solicitada la página devolverá un código de respuesta `404`. Si no se ingresa este argumento el valor por defecto que se asumirá será la fecha actual.

Adicionalmente, se puede solicitar los días que se desean consultar hacia adelante. Para ello se usa el argumentos `f`. Si no se especifica este argumento, por defecto corresponden a `8` días hacia adelante.

    https://www.pyphoy.com/ibague/particulares?d=2018-02-27&f=8

De esta forma, si se desea consultar la información treinta días hacia adelante, se usaría:

    https://www.pyphoy.com/ibague/particulares?d=2018-02-27&f=30

**La cantidad máxima de días que se puede solicitar es 30.**

Si se desea consultar la información de la fecha actual y treinta días hacia adelante, se usaría:

    https://www.pyphoy.com/bogota/taxis?f=30

### Números

Finalmente, se puede consultar la información de acuerdo con el número de la placa para la categoría y la ciudad de interes. Si se desea saber el pico y placa para los taxis en Medellín terminados en placas número `7`, la consulta sería:

    https://www.pyphoy.com/medellin/taxis/7

Esta ruta muestra una tabla de los próximos treinta días con las fechas en que aplica el pico y placa en Medellín para taxis con placas terminadas en 7.

## Licencia

[MIT](LICENSE)
