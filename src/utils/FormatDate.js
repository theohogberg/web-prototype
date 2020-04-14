export default function formatDate(val) {
   const formattedDate = new Date(val)
   const month = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
   ]
   const monthText = month[formattedDate.getMonth()]
   const cleanedDate =
      formattedDate.getDate() +
      ' ' +
      monthText +
      ' ' +
      formattedDate.getFullYear()

   return cleanedDate
}
