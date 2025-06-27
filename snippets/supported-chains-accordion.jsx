export const SupportedChainsAccordion = () => {
  const dataState = useState(null);
  const data = dataState[0];
  const setData = dataState[1];

  const countsState = useState({});
  const counts = countsState[0];
  const setCounts = countsState[1];

  const loadingState = useState(true);
  const isLoading = loadingState[0];
  const setIsLoading = loadingState[1];

  useEffect(function() {
    fetch("https://sim-proxy.dune-d2f.workers.dev/v1/evm/supported-chains", {
      method: "GET",
    })
      .then(function(response) {
        return response.json();
      })
      .then(function(responseData) {
        setData(responseData);

        var balancesCount = 0;
        var activityCount = 0;
        var collectiblesCount = 0;
        var transactionsCount = 0;
        var tokenInfoCount = 0;
        var tokenHoldersCount = 0;

        for (var i = 0; i < responseData.chains.length; i++) {
          var chain = responseData.chains[i];
          if (chain.balances && chain.balances.supported) balancesCount++;
          if (chain.activity && chain.activity.supported) activityCount++;
          if (chain.collectibles && chain.collectibles.supported) collectiblesCount++;
          if (chain.transactions && chain.transactions.supported) transactionsCount++;
          if (chain.token_info && chain.token_info.supported) tokenInfoCount++;
          if (chain.token_holders && chain.token_holders.supported) tokenHoldersCount++;
        }

        setCounts({
          balances: balancesCount,
          activity: activityCount,
          collectibles: collectiblesCount,
          transactions: transactionsCount,
          token_info: tokenInfoCount,
          token_holders: tokenHoldersCount
        });

        setIsLoading(false);
      });
  }, []);

  function renderChainsTable(endpoint) {
    if (!data || !data.chains) {
      return <p>No data available</p>;
    }

    var supportedChains = [];
    for (var i = 0; i < data.chains.length; i++) {
      var chain = data.chains[i];
      if (chain[endpoint] && chain[endpoint].supported) {
        supportedChains.push(chain);
      }
    }

    return (
      <table>
        <thead>
          <tr>
            <th>name</th>
            <th>chain_id</th>
            <th>tags</th>
          </tr>
        </thead>
        <tbody>
          {supportedChains.map(function(chain) {
            return (
              <tr key={chain.name}>
                <td><code>{chain.name}</code></td>
                <td><code>{chain.chain_id}</code></td>
                <td><code>{chain.tags ? chain.tags.join(", ") : ""}</code></td>
              </tr>
            );
          })}
        </tbody>
      </table>
    );
  }

  if (isLoading) {
    return <div>Loading chain information...</div>;
  }

  if (!data) {
    return <div>No data available</div>;
  }

  return (
    <AccordionGroup>
      <Accordion title={"Balances API (" + (counts.balances || 0) + ")"}>
        <p>The <a href="/evm/balances">Balances API</a> supports {counts.balances || 0} chains.</p>
        {renderChainsTable("balances")}
      </Accordion>
      <Accordion title={"Activity API (" + (counts.activity || 0) + ")"}>
        <p>The <a href="/evm/activity">Activity API</a> supports {counts.activity || 0} chains.</p>
        {renderChainsTable("activity")}
      </Accordion>
      <Accordion title={"Collectibles API (" + (counts.collectibles || 0) + ")"}>
        <p>The <a href="/evm/collectibles">Collectibles API</a> supports {counts.collectibles || 0} chains.</p>
        {renderChainsTable("collectibles")}
      </Accordion>
      <Accordion title={"Transactions API (" + (counts.transactions || 0) + ")"}>
        <p>The <a href="/evm/transactions">Transactions API</a> supports {counts.transactions || 0} chains.</p>
        {renderChainsTable("transactions")}
      </Accordion>
      <Accordion title={"Token Info API (" + (counts.token_info || 0) + ")"}>
        <p>The <a href="/evm/token-info">Token Info API</a> supports {counts.token_info || 0} chains.</p>
        {renderChainsTable("token_info")}
      </Accordion>
      <Accordion title={"Token Holders API (" + (counts.token_holders || 0) + ")"}>
        <p>The <a href="/evm/token-holders">Token Holders API</a> supports {counts.token_holders || 0} chains.</p>
        {renderChainsTable("token_holders")}
      </Accordion>
    </AccordionGroup>
  );
};