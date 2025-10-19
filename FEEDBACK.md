# Sim APIs EVM Endpoints Documentation Feedback

## Overview

As a JavaScript developer familiar with web3 integrations, I've reviewed the EVM API endpoints documentation with a focus on developer experience and implementation clarity. The overall API design is solid, but there are several inconsistencies and clarity issues that could create confusion during integration.

**Key Issues Summary:**
- Inconsistent parameter naming and URL structures across endpoints
- Vague parameter descriptions that require developer guesswork
- Mixed OpenAPI specification versions
- Inconsistent response field naming conventions
- Missing or unclear mandatory parameter requirements

## Balances Endpoint

**Strengths:**
- Clear description of token filtering and price lookup methodology
- Good explanation of pagination mechanism
- Helpful warning about `next_offset` usage

**Issues:**
1. **Parameter naming inconsistency**: Uses `uri` as path parameter while other endpoints use `address` or specific names like `token_address`
2. **Vague parameter description**: "Wallet to get balances for" - what formats are accepted? ENS names? Just addresses?
3. **Inconsistent limit description**: Says "Maximum number of transactions to return" but should be "Maximum number of balances to return"
4. **Chain_ids parameter**: Description is overly complex - the examples help but the main description is verbose and could be simplified
5. **Response field inconsistency**: Returns `wallet_address` while other endpoints return `address`

**Recommendations:**
- Use consistent path parameter names across all endpoints
- Specify accepted formats for the address parameter (0x addresses, ENS names, etc.)
- Fix the limit parameter description
- Standardize response field naming

## Activity Endpoint

**Strengths:**
- Comprehensive activity type documentation
- Clear explanation of data finality and re-org handling
- Good callout about native token transfer limitations

**Issues:**
1. **Parameter naming**: Uses `uri` instead of `address` - inconsistent with collectibles endpoint
2. **Missing chain filtering**: No `chain_ids` parameter like other endpoints - this seems like an oversight
3. **Activity type jargon**: Terms like "mint", "burn", "approve" without context explanations for developers new to web3
4. **EIP reference**: The EIP-7708 reference is insider knowledge - needs context
5. **Response structure**: Very complex nested response structure without clear schema documentation in the MDX

**Recommendations:**
- Add `chain_ids` parameter for consistency
- Provide brief explanations for web3-specific activity types
- Add context for the EIP reference or remove it
- Consider simplifying the response structure or provide clearer schema documentation

## Collectibles Endpoint

**Strengths:**
- Clear and simple endpoint description
- Consistent parameter naming with `address`
- Good OpenAPI specification with examples

**Issues:**
1. **URL structure inconsistency**: Uses `/collectibles/{address}` while other endpoints use different patterns
2. **Chain filtering**: Has `chain_ids` parameter but not well documented in the MDX file
3. **Collectibles vs NFTs**: Uses both terms without clarification - pick one for consistency
4. **Response pagination**: Different field naming (`entries` vs `balances`/`activity`)

**Recommendations:**
- Standardize terminology (NFTs vs collectibles)
- Document the `chain_ids` parameter in the MDX file
- Align response structure field names with other endpoints

## Activity Endpoint

**Note:** This appears to be a duplicate heading in my analysis. The Activity endpoint was already covered above.

## Transactions Endpoint

**Strengths:**
- Clear description of transaction ordering
- Good pagination documentation
- Comprehensive transaction data in response

**Issues:**
1. **Parameter naming**: Uses `uri` instead of `address`
2. **Inconsistent limit description**: Says "Maximum number of results to return" which is vague
3. **Chain_ids parameter**: Description differs slightly from other endpoints
4. **Response field naming**: Uses `wallet_address` inconsistently
5. **Hex value documentation**: Several fields return hex values but this isn't clearly explained in the MDX

**Recommendations:**
- Standardize parameter naming across all endpoints
- Clarify that certain fields return hexadecimal values
- Make limit parameter descriptions consistent

## Token Info Endpoint

**Strengths:**
- Clear explanation of required `chain_ids` parameter
- Good pricing methodology explanation

**Issues:**
1. **Mandatory parameter confusion**: The note about `chain_ids` being mandatory is helpful but this should be in the parameter description itself
2. **URI parameter clarity**: "The contract address of the token or 'native'" - needs better explanation
3. **Inconsistent description**: Says "prices" instead of "token info" in limit parameter
4. **Response structure**: Different from other endpoints without clear reasoning

**Recommendations:**
- Mark required parameters clearly in the OpenAPI spec
- Provide examples of valid `uri` values
- Fix parameter descriptions to match endpoint purpose

## Token Holders Endpoint

**Strengths:**
- Clear URL structure with explicit path parameters
- Good error response documentation
- Comprehensive holder information

**Issues:**
1. **URL structure outlier**: Uses `/token-holders/{chain_id}/{token_address}` format which is completely different from other endpoints
2. **Parameter naming**: Uses `next_offset` instead of `offset` for pagination
3. **Inconsistent pagination**: Different parameter name from other endpoints
4. **Chain specification**: Requires `chain_id` in path while others use query parameter

**Recommendations:**
- Consider aligning URL structure with other endpoints
- Use consistent pagination parameter naming
- Clarify why this endpoint uses a different URL pattern

## Extra Non-Categorizable Feedback

### OpenAPI Specification Consistency
- **Version inconsistency**: Some specs use OpenAPI 3.0.3, others use 3.0.0
- **Schema naming**: Different naming conventions across endpoints
- **Error responses**: Inconsistent error response structures

### Documentation Structure
- **Missing cross-references**: Endpoints reference similar concepts but don't link to each other
- **Jargon usage**: Terms like "URI", "pool_size", "low_liquidity" need clearer explanations
- **Parameter relationships**: How `chain_ids` affects other parameters isn't always clear

### Developer Experience Issues
- **Inconsistent parameter names**: `uri` vs `address` vs `token_address` creates confusion
- **Mixed requirements**: Some endpoints require `chain_ids`, others default to "low latency chains"
- **Response field alignment**: Different field names for similar concepts across endpoints

### Recommendations for Improvement
1. **Standardize parameter naming**: Choose either `address` or `uri` and use consistently
2. **Unify URL patterns**: Consider whether all endpoints should follow the same URL structure
3. **Consistent OpenAPI versions**: Use the same OpenAPI version across all specs
4. **Response field standardization**: Use consistent field names for similar concepts
5. **Add more examples**: Include code examples for common use cases
6. **Glossary section**: Add a glossary of web3 and API-specific terms
7. **Parameter relationship documentation**: Clearly explain how parameters interact with each other

### Impact on Integration
These inconsistencies create friction during development:
- Developers need to remember different parameter names for each endpoint
- URL structure differences require separate handling logic
- Response parsing becomes more complex due to field name variations
- Error handling needs to account for different response structures

The APIs are functional but the inconsistencies suggest they were developed separately rather than as a cohesive suite, which impacts developer experience and increases integration complexity.