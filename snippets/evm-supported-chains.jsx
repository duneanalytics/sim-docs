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

  // Build icon URL from chain name using web3icons naming
  const getIconUrlForChain = (chainName) => {
    if (!chainName || typeof chainName !== 'string') {
      return undefined;
    }
    const baseUrl = 'https://raw.githubusercontent.com/0xa3k5/web3icons/refs/heads/main/raw-svgs/networks/branded';
    // Normalize to tokens for robust matching
    const originalLower = chainName.toLowerCase().trim();
    const tokenized = originalLower
      .replace(/[()]/g, ' ')
      .replace(/[_\-]+/g, ' ')
      .replace(/\s+/g, ' ')
      .trim();

    // Explicit mappings for chains with different icon names
    const chainMappings = {
      'arbitrum': 'arbitrum-one',
      'shape': 'ethereum' // Fallback to ethereum icon since shape.svg doesn't exist in web3icons
    };

    // Check if we have a specific mapping for this chain
    if (chainMappings[originalLower]) {
      return `${baseUrl}/${chainMappings[originalLower]}.svg`;
    }

    // Explicit handling for Sepolia variants
    if (tokenized.includes('sepolia')) {
      if (tokenized.includes('base')) {
        return `${baseUrl}/base.svg`;
      }
      return `${baseUrl}/ethereum.svg`;
    }

    // General normalization: drop environment suffixes and hyphenate
    let iconName = tokenized
      .replace(/\b(mainnet|testnet|devnet)\b/g, '')
      .replace(/\s+/g, ' ')
      .trim()
      .replace(/\s+/g, '-');
    // If it's a Sepolia variant, use the base chain icon (e.g., ethereum, base)
    iconName = iconName
      .replace(/\bsepolia\b/g, '')
      .replace(/\bmainnet\b/g, '')
      .replace(/\btestnet\b/g, '')
      .replace(/\bdevnet\b/g, '')
      .replace(/[_\s]+/g, '-')
      .replace(/-+/g, '-')
      .replace(/^-|-$/g, '');

    // Safety: if empty, fallback to ethereum
    if (!iconName) {
      iconName = 'ethereum';
    }

    return `${baseUrl}/${iconName}.svg`;
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
            icon={getIconUrlForChain(chain.name)}
          >
            <br />
            <code>Chains.{enumFormat}</code>
            <br />
            ID: <code>{chain.chain_id}</code>
            {(enumFormat === 'Arbitrum' || enumFormat === 'ArbitrumOne') && (
              <>
                <br />
                <br />
                <strong>Note:</strong> Pre-Nitro blocks (&lt; 22,207,818) are not supported. See <a href="#block-range-support">Block Range Support</a> for details.
              </>
            )}
          </Card>
        );
      })}
    </Columns>
  );
};