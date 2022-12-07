export const dateFormatter = new Intl.DateTimeFormat('pt-BR');


// const options = {
//   year: 'numeric', month: 'numeric', day: 'numeric',
//   hour: 'numeric', minute: 'numeric', second: 'numeric',
//   hour12: false,
//   timeZone: 'America/Sao_Paulo'
// };


// export const dateHourFormatter = new Intl.DateTimeFormat('pt-BR', options);


export const dateHourFormatter = new Intl.DateTimeFormat('en-GB', { dateStyle: 'full', timeStyle: 'long', timeZone: 'Australia/Sydney' });
