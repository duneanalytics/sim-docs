export const EVMSupportedChains = () => {
  const dataState = useState(null);
  const data = dataState[0];
  const setData = dataState[1];

  // Function to convert API chain name to enum format (PascalCase)
  const toEnumFormat = (chainName) => {
    return chainName
      .toLowerCase()
      .split(/[\s_-]+/) // Split on spaces, underscores, or hyphens
      .map(word => word.charAt(0).toUpperCase() + word.slice(1)) // Capitalize first letter of each word
      .join(''); // Join without separators
  };

  // Function to convert enum format to display name (with spaces)
  const toDisplayName = (enumName) => {
    return enumName.replace(/([A-Z])/g, ' $1').trim();
  };

  useEffect(function() {
    fetch("https://api.sim.dune.com/idx/supported-chains", {
      method: "GET",
    })
      .then(function(response) {
        return response.json();
      })
      .then(function(responseData) {
        setData(responseData);
      });
  }, []);

  if (data === null) {
    return <div>Loading chain information...</div>;
  }

  if (!data.chains) {
    return <div>No chain data available</div>;
  }

  var supportedChains = data.chains;
  var count = supportedChains.length;
  var accordionTitle = "IDX Supported Chains (" + count + ")";

  return (
    <Columns cols={3}>
      {supportedChains.map(function(chain) {
        const enumFormat = toEnumFormat(chain.name);
        const displayName = toDisplayName(enumFormat);
        
        return (
          <Card 
            key={chain.name} 
            title={displayName}
            icon="link"
          >
            <br />
            <code>Chains.{enumFormat}</code>
            <br />
            ID: <code>{chain.chain_id}</code>
          </Card>
        );
      })}
    </Columns>
  );
};