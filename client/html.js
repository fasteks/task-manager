// eslint-disable-next-line
const Html = ({ body }) => {
  return `
  <!DOCTYPE html>
  <html>
    <head>
      <meta charset="UTF-8">
      <link rel="stylesheet" type="text/css" href="/css/main.css" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <link
      rel="icon"
      href="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAIAAACQd1PeAAAADElEQVQI12P4//8/AAX+Av7czFnnAAAAAElFTkSuQmCC"
    />
    <script src='https://kit.fontawesome.com/a076d05399.js' type="application/json" crossorigin='anonymous'></script>
    </head>
    <body>
      <script type="text/javascript" src="/js/main.bundle.js?v=COMMITHASH"></script>
    </body>
  </html>
`
}

export default Html
