import { useEffect, useState } from 'react';
import useSWR from 'swr';

function LastSalesPage(props) {
  // use response from server-side query as initial props
  const [sales, setSales] = useState(props.sales);

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
  if (!data && !sales) {
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
  // example of combining server-side with client-side data fetching
  // aka. pre-rendering pages with data
  const response = await fetch(
    'https://nextjs-course-cb02f-default-rtdb.firebaseio.com/sales.json'
  );
  const data = await response.json();
  const transformedSales = [];

  for (const key in data) {
    transformedSales.push({
      id: key,
      username: data[key].username,
      volume: data[key].volume,
    });
  }

  return {
    props: {
      sales: transformedSales,
      // --revalidate--
      // optional prop, num of secs to revalidate query after deployment
      // note: not recommended for production build?
      revalidate: 10,
    },
  };
}

export default LastSalesPage;
