export function formatPercentage(data) {
  let _class;

  if (data === 0) {
    _class = "text-yellow-500";
  } else if (data > 0) {
    _class = "text-green-500";
  } else {
    _class = "text-red-500";
  }

  return `<span class="${_class}">${parseFloat(data).toFixed(2)}%</span>`;
}

export function formatProfit(data) {
  let _class;

  if (data["profit"] === 0) {
    _class = "text-yellow-500";
  } else if (data["profit"] > 0) {
    _class = "text-green-500";
  } else {
    _class = "text-red-500";
  }

  if (data["close_amount"] === null) {
    return `<div class="flex space-x-1 items-center"><img src="${
      data["sell_logo"]
    }" class="w-5 h-5"> <span class="${_class}">${nums.formatPrice(
      data["profit"],
      2
    )}</span> 
    <span class="text-xs">
      (${parseFloat(
        nums.getPercentageIncrease(
          data["current_sell_price"],
          data["buy_price"]
        )
      ).toFixed(2)}%)
      </span>
      </div>`;
  } else {
    return `<div class="flex space-x-1 items-center"><img src="${
      data["sell_logo"]
    }" class="w-5 h-5"> <span class="${_class}">${nums.formatPrice(
      data["profit"],
      2
    )}</span> 
    <span class="text-xs">
           
      </span>
      </div>`;
  }
}

export function formatLogo(data, logo) {
  return `<div class="flex space-x-1 items-center"><img src="${logo}" class="w-6 h-6"> <span>${nums.formatPrice(
    data
  )}</span></div>`;
}

/**
 * Get asset name with logo and symbol
 * @param {asset} data
 * @returns LOGO NAME (SYMBOL)
 */
export function formatName(data) {
  return `<div class="flex items-center space-x-3">
      <img src="${data.logo}" class="w-6 h-6 rounded-full"> 

      <div class="flex flex-col">
        <span>${data.name}</span> 
        <span class="text-xs font-semibold">${data.symbol}</span>
      </div>
    </div>`;
}
