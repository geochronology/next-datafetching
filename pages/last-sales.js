import { useEffect, useState } from 'react';
import useSWR from 'swr';

function LastSalesPage() {
  const [sales, setSales] = useState();

  // -- useSWR --
  // data-fetching hook; takes 2 args:
  // 1. identifier of URL it should fetch on loading
  // 2. fetcher to handle data once it arrives

  const fetcher = (url) => fetch(url).then((res) => res.json());

  const { data, error } = useSWR(
    'https://nextjs-course-cb02f-default-rtdb.firebaseio.com/sales.json',
    fetcher
  );

  useEffect(() => {
    const transformedSales = [];
    if (data) {
      console.log(data);

      for (const key in data) {
        transformedSales.push({
          id: key,
          username: data[key].username,
          volume: data[key].volume,
        });
      }
    }
    setSales(transformedSales);
  }, [data]);

  if (error) {
    return <p>Failed to load</p>;
  }

  if (!data || !sales) {
    return <p>Loading...</p>;
  }

  return (
    <ul>
      {sales.map((sale) => (
        <li key={sale.id}>
          {sale.username} - ${sale.volume}
        </li>
      ))}
    </ul>
  );
}

export async function getStaticProps() {
  fetch('https://nextjs-course-cb02f-default-rtdb.firebaseio.com/sales.json')
    .then((res) => res.json())
    .then((data) => {
      const transformedSales = [];

      for (const key in data) {
        transformedSales.push({
          id: key,
          username: data[key].username,
          volume: data[key].volume,
        });
      }
    });
}

export default LastSalesPage;
