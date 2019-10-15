# Frontend Assessment
![frontend](https://res.cloudinary.com/drcjcovjy/image/upload/v1568943437/misc/front_nzjoba.png)

## Demo

La aplicación puede verse desde el siguient enlace: [deployed app](https://xenodochial-jennings-fdbaf9.netlify.com/)


## Si se desea instalar localmente

### Clona el repositorio

Clona este repositorio en tu máquina local

```bash
git clone git@github.com:sergiocrol/dobcn-react.git
```

### installation

Install the dependencies

```
npm install
```

### run app

Start the application, and will be running on port 3000

```
gatsby serve
```

## Tecnologías

Para desarrollar esta aplicación se ha hecho uso de Gatsby, un framework basado en React.
Alternativamente podría haberse desarrollado con React puro, haciendo frente a los problemas de SEO mediante librerías como React Router y Helmet.

## Desafíos y soluciones

Debido a que en en momento de realizar la aplicación no tenía acceso a la REST API proporcionada para la construcción de la app; tuve que realizar scraping de la web principal. Para ello he construído una REST API que obtiene los datos de la web mencionada, los guarda en la base de datos, y los retorna en formato JSON cuando es llamada por una aplicación desde frontend.
Puede verse la REST API en el siguiente enlace:

[REST API](https://github.com/sergiocrol/dobcn-back)


## Git

[Repository Link](https://github.com/sergiocrol/dobcn-react)

## Deployment

[Deployment Link](https://xenodochial-jennings-fdbaf9.netlify.com/)

## Author

[Sergio Cordero Rol](https://github.com/sergiocrol)
