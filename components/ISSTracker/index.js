import Controls from "../Controls/index";
import Map from "../Map/index";
import useSWR from "swr";

export default function ISSTracker() {
  
  const url = "https://api.wheretheiss.at/v1/satellites/25544";
  const fetcher = (url) => fetch(url).then((r) => r.json());
  // const { data, error, isLoading } = useSWR(url, fetcher);
  const { data, error, isLoading, mutate } = useSWR(url, fetcher, {
    refreshInterval: 5000,
  });
  if (error) return <div>failed to load</div>;
  if (isLoading) return <div>loading...</div>;

  function handleReload() {
    mutate();
  }

  // const [coords, setCoords] = useState({
  //   longitude: 0,
  //   latitude: 0,
  // });

  // async function getISSCoords() {
  //   try {
  //     const response = await fetch(URL);
  //     if (response.ok) {
  //       const data = await response.json();
  //       setCoords({ longitude: data.longitude, latitude: data.latitude });
  //     }
  //   } catch (error) {
  //     console.error(error);
  //   }
  // }

  // useEffect(() => {
  //   const timer = setInterval(() => {
  //     getISSCoords();
  //   }, 5000);

  //   return () => {
  //     clearInterval(timer);
  //   };
  // }, []);
  

  return (
    <main>
      <Map longitude={data.longitude} latitude={data.latitude} />
      <Controls
        longitude={data.longitude}
        latitude={data.latitude}
        onRefresh={handleReload}
      />
    </main>
  );
}
