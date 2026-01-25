import { FaShareAlt, FaHeart } from "react-icons/fa";
import { MdBlock, MdArrowOutward } from "react-icons/md";
import { HiDownload } from "react-icons/hi";

interface StockData {
  symbol: string;
  companyName: string;
  callDate: string;
  status: 'Open' | 'Closed';
  term: 'Mid Term' | 'Short Term';
  potentialUpside: string;
  stopLoss: string;
  entryPrice: string;
  targetPrice: string;
  likes: number;
  isSubscribed?: boolean;
}

interface StockTradingCardsProps {
  data?: StockData;
}

interface CardSummaryProps {
  niftyExpiryReport?: string;
  dateFormat?: string;
  dateTimeStamp?: string;
  bulletPoints?: string[];
  viewSummary?: string;
  download?: string;
}

interface CardDetailsProps {
  swiggy?: string;
  date?: string;
  cmp?: string;
  targetPrice?: string;
  moReco?: 'BUY' | 'SELL';
  summaryText?: string[];
  viewSummary?: string;
  download?: string;
}

interface ResearchReportCardProps {
  companyName?: string;
  cmpValue?: string;
  cmpGrowth?: string;
  cmpPercentage?: string;
  analystsCovered?: string;
  avgReco?: string;
  strongSellCount?: number;
  sellCount?: number;
  holdCount?: number;
  buyCount?: number;
  strongBuyCount?: number;
  reportDate?: string;
  avgPriceTarget?: string;
  differenceFromCMP?: string;
  lowPriceTargetValue?: string;
  avgPriceTargetValue?: string;
  highPriceTargetValue?: string;
}

// Props for ReportScoreCard component
// priceMomentum can be 'NR' (No Rating) or a numeric score represented as a string (e.g. '7')
interface ReportScoreCardProps {
  companyName?: string;          // Full company name
  stockScore?: string;           // Composite stock score display (e.g. '9/10')
  pdfReport?: string;            // Label for the downloadable report flag
  earnings?: number;             // 0-10 scale
  fundamentals?: number;         // 0-10 scale
  relativeValuation?: number;    // 0-10 scale
  risk?: number;                 // 0-10 scale (lower may indicate less risk depending on logic)
  priceMomentum?: string;        // 'NR' or numeric string '0'-'10'
}

export const CardDetails = ({ 
  swiggy = 'Swiggy',
  date = '04 Dec 2024',
  cmp = '\u20b917,107.85',
  targetPrice = '\u20b917,107.85',
  moReco = 'BUY',
  summaryText = [
    "Swiggy's financials and valuations for FY25-FY27..",
    "The company's food delivery business is expecte.."
  ],
  viewSummary = 'View Summary',
  download = 'Download'
}: CardDetailsProps) => {
  return (
    <div className="w-full max-w-full bg-[var(--color-mofsl-white)] rounded-xl overflow-hidden" style={{ boxShadow: '0px 0px 18px 1.4px var(--color-mofsl-gray-border)' }}>
      {/* Header */}
      <div className="flex flex-col items-start p-3 px-4 gap-3 h-[81px] bg-[var(--color-mofsl-white)] rounded-t-xl">
        <div className="flex flex-col items-start gap-1.5 w-full h-[57px]">
          <div className="flex flex-row items-center gap-4 w-[159px] h-[57px]">
            <div className="w-[57px] h-[57px] bg-[var(--color-mofsl-white)] border border-[var(--color-mofsl-gray-border)] rounded-full flex items-center justify-center">
              <img 
                src="/Swiggy logo.png" 
                alt="Swiggy Logo" 
                className="w-8 h-8 object-cover"
              />
            </div>
            <div className="flex flex-col justify-center items-start gap-1.5 w-[86px] h-[57px]">
              <h3 className="text-xl font-bold leading-[30px] text-[var(--color-mofsl-primary-color)] font-['Poppins'] w-[76px] h-[30px]">{swiggy}</h3>
              <p className="text-sm font-normal leading-[21px] text-[var(--color-mofsl-primary-color)] font-['Poppins'] w-[86px] h-[21px]">{date}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className="w-full h-px bg-[var(--color-mofsl-gray-border]"></div>

      {/* Content */}
      <div className="flex flex-col items-start p-3 px-4 gap-3 h-[232px] bg-[var(--color-mofsl-white)] rounded-b-xl">
        {/* Price Section */}
        <div className="flex flex-row justify-between items-start w-full h-[42px]">
          <div className="flex flex-col items-start gap-2 flex-1">
            <span className="text-xs font-normal leading-[18px] text-[var(--color-mofsl-gray)] font-['Poppins']">
              CMP
            </span>
            <span className="text-sm font-semibold leading-[21px] text-[var(--color-mofsl-text-black)] font-['Poppins']">
              {cmp}
            </span>
          </div>
          <div className="w-px h-[42px] bg-[var(--color-mofsl-gray-border)] mx-4"></div>
          <div className="flex flex-col items-center gap-2 flex-1">
            <span className="text-xs font-normal leading-[18px] text-center text-[var(--color-mofsl-gray)] font-['Poppins']">
              Target Price
            </span>
            <span className="text-sm font-semibold leading-[21px] text-center text-[var(--color-mofsl-text-black)] font-['Poppins']">
              {targetPrice}
            </span>
          </div>
          <div className="w-px h-[42px] bg-[var(--color-mofsl-gray-border)] mx-4"></div>
          <div className="flex flex-col items-end gap-2 flex-1">
            <span className="text-xs font-normal leading-[18px] text-right text-[var(--color-mofsl-gray)] font-['Poppins']">
              MO Reco.
            </span>
            <span className={`text-sm font-semibold leading-[21px] text-right font-['Poppins'] ${
              moReco === 'BUY' ? 'text-[var(--color-mofsl-green-success)]' : 'text-[var(--color-mofsl-red-error)]'
            }`}>
              {moReco}
            </span>
          </div>
        </div>

        {/* Divider */}
        <div className="w-full h-px bg-[var(--color-mofsl-gray-border)]"></div>

        {/* Summary Points */}
        <div className="flex flex-col items-start gap-1.5 w-full h-[94px]">
          {summaryText.map((text, index) => {
            const words = text.split(' ');
            const firstLine = words.slice(0, 6).join(' ');
            const hasMoreWords = words.length > 6;
            const secondLineWord = hasMoreWords ? words[6] : '';
            const truncatedSecondLine = hasMoreWords ? `${secondLineWord.substring(0, 6)}..` : '';
            
            return (
              <div key={index} className="flex flex-row items-start gap-2.5 w-full h-[44px]">
                <div className="flex items-start pt-2 w-[7px] h-[23px]">
                  <div className="w-2 h-2 bg-[var(--color-mofsl-text-black)] rounded-full"></div>
                </div>
                <div className="text-sm font-normal leading-[22px] text-[var(--color-mofsl-text-black)] font-['Poppins'] flex-1">
                  <div>{firstLine}</div>
                  {hasMoreWords && <div>{truncatedSecondLine}</div>}
                </div>
              </div>
            );
          })}
        </div>

        {/* Divider */}
        <div className="w-full h-px bg-[var(--color-mofsl-gray-border)]"></div>

        {/* Action Buttons */}
        <div className="flex flex-row justify-between items-center gap-3.5 w-full h-[22px]">
          <div className="flex flex-row items-center gap-1 w-[135px] h-[22px] cursor-pointer">
            <span className="text-sm font-semibold leading-[22px] text-[var(--color-mofsl-primary-color)] font-['Poppins'] w-[109px] h-[22px]">{viewSummary}</span>
            <div className="w-[22px] h-[22px] flex items-center justify-center">
              <MdArrowOutward size={16} color="var(--color-mofsl-primary-color)" />
            </div>
          </div>
          <div className="flex flex-row items-center gap-1 w-[98px] h-[22px] cursor-pointer">
            <span className="text-sm font-semibold leading-[22px] text-[var(--color-mofsl-primary-color)] font-['Poppins'] w-[72px] h-[22px]">{download}</span>
            <div className="w-[22px] h-[22px] flex items-center justify-center">
              <HiDownload size={16} color="var(--color-mofsl-primary-color)" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export const CardSummary = ({ niftyExpiryReport = 'Nifty Expiry Report',
    dateFormat = '14-Oct-2025',
    dateTimeStamp = '16 Oct 2023 15:12',
    bulletPoints = [
      "Swiggy's financials and valuations for FY25-FY27 are looking strong",
      "The company's food delivery business is expected to grow significantly",
      "Instamart's GOV and contribution margin are showing positive trends"
    ],
    viewSummary = 'View Summary',
    download = 'Download' }: CardSummaryProps) => {


  return (
    <div className="w-full h-full relative rounded-xl overflow-hidden" style={{ boxShadow: '0px 0px 18px 1.4px var(--color-mofsl-gray-shadow)' }}>
      {/* Header */}
      <div className="flex flex-col items-start p-3 px-4 gap-3 w-full h-[81px] bg-mo-white rounded-t-xl">
        <div className="flex flex-col items-start gap-1.5 w-full h-[57px]">
          <div className="flex flex-row items-center gap-4 w-[299px] h-[57px]">
            <div className="w-[57px] h-[57px] bg-mo-white border border-[var(--color-mofsl-gray-border)] rounded-full flex items-center justify-center">
              <img 
                src="/Building logo.png" 
                alt="Building Logo" 
                className="w-8 h-8 object-cover"
              />
            </div>
            <div className="flex flex-col justify-center items-start gap-1.5 w-[226px] h-[48px]">
              <div className="flex flex-row items-center w-full">
                <h3 className="text-sm font-semibold leading-[21px] text-[var(--color-mofsl-primary-color)] font-['Poppins'] flex-1">{niftyExpiryReport}: { dateFormat}</h3>
              </div>
              <p className="text-sm font-normal leading-[21px] text-[var(--color-mofsl-primary-color)] font-['Poppins']">{dateTimeStamp}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className="w-full h-px bg-[var(--color-mofsl-gray-border)]"></div>

      {/* Content */}
      <div className="flex flex-col items-start p-3 px-4 gap-3 w-full h-[215px] bg-mo-white rounded-b-xl">
        <div className="flex flex-col items-start gap-1.5 w-full h-[144px]">
          {/* Bullet Points */}
          {bulletPoints.map((point, index) => {
            const words = point.split(' ');
            const firstLine = words.slice(0, 6).join(' ');
            const hasMoreWords = words.length > 6;
            const secondLineWord = hasMoreWords ? words[6] : '';
            const truncatedSecondLine = hasMoreWords ? `${secondLineWord.substring(0, Math.min(secondLineWord.length, 10))}..` : '';
            
            return (
              <div key={index} className="flex flex-row items-start gap-2.5 w-full h-[44px]">
                <div className="flex items-start pt-2 w-[7px] h-[23px]">
                  <div className="w-2 h-2 bg-mo-black rounded-full flex-shrink-0"></div>
                </div>
                <div className="text-sm font-normal leading-5 text-mo-black font-['Poppins'] flex-1">
                  <div>{firstLine}</div>
                  {hasMoreWords && <div>{truncatedSecondLine}</div>}
                </div>
              </div>
            );
          })}
        </div>

        {/* Divider */}
        <div className="w-full h-px bg-[var(--color-mofsl-gray-border)]"></div>

        {/* Action Buttons */}
        <div className="flex flex-row justify-between items-center gap-3.5 w-full h-[22px]">
          <div className="flex flex-row items-center gap-1 w-[135px] h-[22px] cursor-pointer">
            <span className="text-sm font-semibold leading-[22px] text-[var(--color-mofsl-primary-color)] font-['Poppins']">{viewSummary}</span>
            <div className="w-[22px] h-[22px] flex items-center justify-center">
              <MdArrowOutward size={16} color="var(--color-mofsl-primary-color)" />
            </div>
          </div>
          <div className="flex flex-row items-center gap-1 w-[98px] h-[22px] cursor-pointer">
            <span className="text-sm font-semibold leading-[22px] text-[var(--color-mofsl-primary-color)] font-['Poppins']">{download}</span>
            <div className="w-[22px] h-[22px] flex items-center justify-center">
              <HiDownload size={16} color="var(--color-mofsl-primary-color)" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export const ResearchReportCard = ({
  companyName = 'Tata Consultancy Services Ltd.',
  cmpValue = '457.95',
  cmpGrowth = '+71.80',
  cmpPercentage = '(+1.80%)',
  analystsCovered = '20',
  avgReco = 'Strong Buy',
  strongSellCount = 0,
  sellCount = 0,
  holdCount = 1,
  buyCount = 6,
  strongBuyCount = 10,
  reportDate = '14 Aug, 24',
  avgPriceTarget = '3354.57',
  differenceFromCMP = '(+13.5%)',
  lowPriceTargetValue = '2,750.00',
  avgPriceTargetValue = '3,354.57',
  highPriceTargetValue = '3,850.00'
}: ResearchReportCardProps) => {
  const recommendations = [
    { label: 'Strong Sell', shortLabel: 'Strong Sell', count: strongSellCount, color: 'var(--color-mofsl-risk-red)', bgColor: 'var(--color-mofsl-risk-red)' },
    { label: 'Sell', shortLabel: 'Sell', count: sellCount, color: 'var(--color-mofsl-sell-light)', bgColor: 'var(--color-mofsl-sell-light)' },
    { label: 'Hold', shortLabel: 'Hold', count: holdCount, color: 'var(--color-mofsl-fundamentals-orange)', bgColor: 'var(--color-mofsl-fundamentals-orange)' },
    { label: 'Buy', shortLabel: 'Buy', count: buyCount, color: 'var(--color-mofsl-green-primary)', bgColor: 'var(--color-mofsl-green-primary)' },
    { label: 'Strong Buy', shortLabel: 'Strong Buy', count: strongBuyCount, color: 'var(--color-mofsl-green-primary)', bgColor: 'var(--color-mofsl-green-primary)' }
  ];

  return (
    <div className="flex flex-col w-full h-full rounded-xl overflow-hidden" style={{ boxShadow: '0px 0px 18px 1.4px var(--color-mofsl-gray-shadow)' }}>
      {/* Header */}
      <div className="flex flex-col items-start p-3 px-4 gap-3 w-full h-[135px] bg-mo-white rounded-t-xl">
        <div className="flex flex-col items-start gap-1.5 w-full h-[111px]">
          <div className="flex flex-row items-center gap-4 w-full h-[111px]">
            <div className="w-[57px] h-[57px] bg-mo-white border border-[var(--color-mofsl-gray-border)] rounded-full flex items-center justify-center">
              <img src="/TCS logo.png" alt="TCS Logo" className="w-[31.35px] h-[19.29px] object-cover" />
            </div>
            <div className="flex flex-col justify-center items-start gap-1.5 flex-1 h-[111px]">
              <div className="h-[60px]">
                <h3 className="text-xl font-bold leading-[30px] text-[var(--color-mofsl-primary-color)] font-['Poppins']">
                  {companyName.split(' ').slice(0, 2).join(' ')}
                </h3>
                <h3 className="text-xl font-bold leading-[30px] text-[var(--color-mofsl-primary-color)] font-['Poppins']">
                  {companyName.split(' ').slice(2).join(' ')}
                </h3>
              </div>
              <p className="text-sm font-medium leading-[21px] text-[var(--color-mofsl-primary-color)] font-['Poppins'] h-[21px]">
                CMP: {cmpValue} <span className="text-[var(--color-mofsl-green-primary)]">{cmpGrowth} {cmpPercentage}</span>
              </p>
              <p className="text-xs font-normal leading-[18px] text-[var(--color-mofsl-primary-color)] font-['Poppins'] h-[18px]">
                Covered by <span className="font-bold">{analystsCovered}</span> Market Analysts
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className="w-full h-px bg-[var(--color-mofsl-gray-border)]"></div>

      {/* Content */}
      <div className="flex flex-col justify-end items-start p-4 gap-1.5 w-full h-[335px] bg-mo-white rounded-b-xl">
        <div className="flex flex-col items-center gap-4 w-full h-[303px]">
          {/* Avg Reco Section */}
          <div className="flex flex-col items-start gap-1.5 w-full h-[125px]">
            <div className="flex flex-col items-start gap-1.5 w-full h-[63px]">
              <div className="flex flex-row justify-between items-center w-full h-[36px]">
                <span className="text-base font-normal leading-[24px] text-mo-black font-['Poppins']">Avg. Reco.</span>
                <span className="text-2xl font-bold leading-[36px] text-[var(--color-mofsl-green-primary)] font-['Poppins']">{avgReco}</span>
              </div>
              <span className="text-sm font-normal leading-[21px] text-[var(--color-mofsl-gray-text)] font-['Poppins']">Analysts wise Reco split</span>
            </div>

            {/* Recommendations */}
            <div className="flex flex-row justify-between items-end w-full h-[50px]">
              {recommendations.map((rec, index) => (
                <div key={index} className="flex flex-col items-center gap-1.5 flex-1 h-[50px]">
                  <div className="w-full h-[3px]" style={{ backgroundColor: rec.bgColor }}></div>
                  <div className="flex flex-col items-center gap-0.5 w-[45px] h-[41px]">
                    <span className="text-sm font-medium leading-[21px] text-center text-mo-black font-['Poppins']">{rec.count}</span>
                    <span className="text-xs font-normal leading-[18px] text-center text-[var(--color-mofsl-gray-text)] font-['Poppins']">{rec.shortLabel}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Divider */}
          <div className="w-full h-px bg-[var(--color-mofsl-gray-border)]"></div>

          {/* Price Targets */}
          <div className="flex flex-col items-start gap-1.5 w-full h-[78px]">
            <div className="flex flex-row justify-between items-start w-full h-[24px]">
              <span className="text-base font-normal leading-[24px] text-mo-black font-['Poppins']">Avg. Price Target (APT)</span>
              <span className="text-base font-medium leading-[24px] text-mo-black font-['Poppins']">{avgPriceTarget}</span>
            </div>
            <div className="flex flex-row justify-between items-center w-full h-[24px]">
              <span className="text-base font-normal leading-[24px] text-mo-black font-['Poppins']">(Difference from CMP)</span>
              <span className="text-base font-medium leading-[24px] text-[var(--color-mofsl-green-primary)] font-['Poppins']">{differenceFromCMP}</span>
            </div>
            <span className="text-xs font-normal leading-[18px] text-left text-[var(--color-mofsl-gray-text)] font-['Poppins']">Analyst&#39;s Price Target Range</span>
          </div>

          {/* Price Range Visualization */}
          <div className="relative w-full h-[20px]">
            {/* Dashed line with arrows */}
            <div className="absolute top-1/2 left-0 right-0 h-px border-t border-dashed border-black transform -translate-y-1/2"></div>
            <div className="absolute top-1/2 left-0 transform -translate-y-1/2">
              <div className="w-0 h-0 border-t-[4px] border-t-transparent border-b-[4px] border-b-transparent border-l-[8px] border-l-black"></div>
            </div>
            <div className="absolute top-1/2 right-0 transform -translate-y-1/2">
              <div className="w-0 h-0 border-t-[4px] border-t-transparent border-b-[4px] border-b-transparent border-r-[8px] border-r-black"></div>
            </div>
            
            {/* Colored dots */}
            <div className="absolute top-1/2 left-[10%] w-3 h-3 bg-white border-2 border-[var(--color-mofsl-price-target-low)] rounded-full transform -translate-y-1/2"></div>
            <div className="absolute top-1/2 left-1/2 w-3 h-3 bg-white border-2 border-[var(--color-mofsl-fundamentals-orange)] rounded-full transform -translate-x-1/2 -translate-y-1/2"></div>
            <div className="absolute top-1/2 right-[10%] w-3 h-3 bg-white border-2 border-[var(--color-mofsl-green-primary)] rounded-full transform -translate-y-1/2"></div>
          </div>

          {/* Footer Price Targets */}
          <div className="flex flex-row justify-between items-end w-full h-[51px]">
            <div className="flex flex-col items-start">
              <span className="text-xs font-semibold leading-[18px] text-[var(--color-mofsl-price-target-low)] font-['Poppins']">Low Price Target</span>
              <span className="text-base font-semibold leading-[24px] text-[var(--color-mofsl-price-target-low)] font-['Poppins']">{lowPriceTargetValue}</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-xs font-semibold leading-[18px] text-[var(--color-mofsl-fundamentals-orange)] font-['Poppins']">Avg. Price Target</span>
              <span className="text-base font-semibold leading-[24px] text-[var(--color-mofsl-fundamentals-orange)] font-['Poppins']">{avgPriceTargetValue}</span>
            </div>
            <div className="flex flex-col items-end">
              <span className="text-xs font-semibold leading-[18px] text-[var(--color-mofsl-green-primary)] font-['Poppins']">High Price Target</span>
              <span className="text-base font-semibold leading-[24px] text-[var(--color-mofsl-green-primary)] font-['Poppins']">{highPriceTargetValue}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export const StockTradingCards = ({ data }: StockTradingCardsProps) => {
  const defaultData: StockData = {
    symbol: 'HDFC BANK',
    companyName: 'HDFC Bank Private Limited',
    callDate: '5 Apr, 10:56 AM',
    status: 'Open',
    term: 'Mid Term',
    potentialUpside: '44.03%',
    stopLoss: '₹190.00',
    entryPrice: '₹190.00',
    targetPrice: '₹190.00',
    likes: 12,
    isSubscribed: true
  };

  const stockData = data || defaultData;

  return (
    <div className="w-full h-full relative rounded-3xl overflow-hidden" style={{ boxShadow: '0px 0px 18px 1.4px var(--color-mofsl-gray-shadow)' }}>
      {/* Header */}
      <div className="flex flex-col items-start p-2 px-4 gap-3 w-full h-[37px] rounded-t-3xl" style={{ backgroundColor: 'var(--color-mofsl-blue-header)' }}>
        <div className="flex flex-row justify-between items-center w-full h-[21px]">
          <div className="flex flex-row items-center gap-1.5 w-[116px] h-5">
            <div className="flex flex-row justify-center items-center px-2 gap-2.5 w-[47px] h-5 rounded" style={{ backgroundColor: 'var(--color-mofsl-mofsl-green-primary)' }}>
              <span className="text-[10px] font-bold leading-[15px] text-white font-['Poppins']">{stockData.status}</span>
            </div>
            <div className="flex flex-row justify-center items-center px-2 gap-0.5 w-[63px] h-5 bg-white border border-[var(--color-mofsl-gray-border)] rounded">
              <span className="text-[10px] font-medium leading-[15px] text-[var(--color-mofsl-primary-color)] font-['Poppins']">{stockData.term}</span>
            </div>
          </div>
          <span className="text-sm font-normal leading-[21px] text-white font-['Poppins']">Call date: {stockData.callDate}</span>
        </div>
      </div>

      {/* Company Info */}
      <div className="flex flex-col items-start p-3 px-4 gap-3 w-full h-[108px] bg-white">
        <div className="flex flex-col items-start gap-1.5 w-full h-[84px]">
          <div className="flex flex-row items-center gap-4 w-[255px] h-[84px]">
            <div className="w-[57px] h-[57px] bg-white border border-[var(--color-mofsl-gray-border)] rounded-full flex items-center justify-center">
              <img 
                src="/Hdfclogo.jpg" 
                alt="HDFC Logo" 
                className="w-8 h-8 object-cover"
              />
            </div>
            <div className="flex flex-col justify-center items-start gap-1.5 w-[182px] h-[84px]">
              <div className="flex flex-row items-center gap-2 h-[30px]">
                <h3 className="text-xl font-bold leading-[30px] uppercase text-[var(--color-mofsl-primary-color)] font-['Poppins'] whitespace-nowrap">{stockData.symbol}</h3>
              </div>
              <p className="text-sm font-normal leading-[21px] text-[var(--color-mofsl-primary-color)] font-['Poppins']">{stockData.companyName}</p>
              <div className="flex flex-row items-center gap-1 w-[148px] h-[21px]">
                <div className="w-[15px] h-[15px] bg-white border-4 border-[var(--color-mofsl-live-price-blue)] rounded-full"></div>
                <span className="text-sm font-medium leading-[21px] text-[var(--color-mofsl-primary-color)] font-['Poppins']">Live Price: ₹200.00</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className="w-full h-px bg-[var(--color-mofsl-gray-border)]"></div>

      {/* Main Content */}
      <div className="flex flex-col justify-end items-start p-4 gap-1.5 w-full h-[255px] bg-white rounded-b-3xl">
        <div className="flex flex-col items-center gap-4 w-full h-[223px]">
          {/* Potential Upside */}
          <div className="flex flex-row justify-center items-center w-full h-[68px]">
            <div className="flex flex-col items-center gap-1.5 w-[136px] h-[68px]">
              <span className="text-xs font-normal leading-[18px] text-[var(--color-mofsl-gray-text)] font-['Poppins']">Potential Upside</span>
              <div className="flex flex-row justify-center items-center w-[136px] h-[44px]">
                <span className="text-4xl font-bold leading-[44px] text-[var(--color-mofsl-blue-primary)] font-['Poppins']">{stockData.potentialUpside}</span>
              </div>
            </div>
          </div>

          {/* Price Actions */}
          <div className="flex flex-row items-start gap-3 w-full h-[74px]">
            {/* Stop Loss */}
            <div className="flex flex-col justify-center items-center p-3 gap-2 flex-1 h-[74px] border border-[var(--color-mofsl-red-primary)] rounded-lg" style={{ backgroundColor: 'var(--color-mofsl-red-light)' }}>
              <div className="flex flex-row justify-center items-center gap-1.5 w-full h-[15px]">
                <MdBlock size={12} color="var(--color-mofsl-red-primary)" />
                <span className="text-[10px] font-medium leading-[15px] text-[var(--color-mofsl-red-primary)] font-['Poppins']">Stop Loss</span>
              </div>
              <span className="text-lg font-semibold leading-[27px] text-[var(--color-mofsl-red-primary)] font-['Poppins']">{stockData.stopLoss}</span>
            </div>

            {/* Entry Price */}
            <div className="flex flex-col justify-center items-center p-3 gap-2 flex-1 h-[74px] border border-[var(--color-mofsl-blue-primary)] rounded-lg" style={{ backgroundColor: 'var(--color-mofsl-blue-light)' }}>
              <div className="flex flex-row justify-center items-center gap-1.5 w-full h-[15px]">
                <img src="/entryprice.svg" alt="Entry Price" className="w-3 h-3" />
                <span className="text-[10px] font-medium leading-[15px] text-[var(--color-mofsl-blue-primary)] font-['Poppins']">Entry Price</span>
              </div>
              <span className="text-lg font-semibold leading-[27px] text-[var(--color-mofsl-blue-primary)] font-['Poppins']">{stockData.entryPrice}</span>
            </div>

            {/* Target Price */}
            <div className="flex flex-col justify-center items-center p-3 gap-2 flex-1 h-[74px] border border-[var(--color-mofsl-green-primary)] rounded-lg" style={{ backgroundColor: 'var(--color-mofsl-green-light)' }}>
              <div className="flex flex-row justify-center items-center gap-1.5 w-full h-[15px]">
                <img src="/targetprice.svg" alt="Target Price" className="w-3 h-3" />
                <span className="text-[10px] font-medium leading-[15px] text-[var(--color-mofsl-green-primary)] font-['Poppins']">Target Price</span>
              </div>
              <span className="text-lg font-semibold leading-[27px] text-[var(--color-mofsl-green-primary)] font-['Poppins']">{stockData.targetPrice}</span>
            </div>
          </div>

          {/* Divider */}
          <div className="w-full h-px bg-[var(--color-mofsl-gray-border)]"></div>

          {/* Action Buttons */}
          <div className="flex flex-row justify-center items-center gap-2 w-full h-8">
            <button className="flex flex-row justify-center items-center px-3 gap-2.5 flex-1 h-8 bg-[var(--color-mofsl-green-primary)] rounded-lg">
              <span className="text-xs font-semibold leading-[18px] text-white font-['Poppins']">Buy Now</span>
            </button>
            <button className="flex flex-row justify-center items-center px-2 gap-1.5 w-[51.5px] h-8 border border-[var(--color-mofsl-gray-border)] rounded-lg">
              <FaHeart size={16} color="var(--color-mofsl-primary-color)" />
              <span className="text-xs font-semibold leading-[18px] text-[var(--color-mofsl-primary-color)] font-['Poppins']">{stockData.likes}</span>
            </button>
            <button className="flex flex-row justify-center items-center px-3 gap-2.5 w-8 h-8 border border-[var(--color-mofsl-gray-border)] rounded-lg">
              <FaShareAlt size={18} color="var(--color-mofsl-primary-color)" style={{ width: '18px', height: '18px' }} />
            </button>
            <button className="flex flex-row justify-center items-center px-2 gap-1.5 w-[67.39px] h-8 border border-[var(--color-mofsl-gray-border)] rounded-lg">
              <img src="/save.svg" alt="Save" className="w-4 h-4" />
              <span className="text-xs font-semibold leading-[18px] text-[var(--color-mofsl-primary-color)] font-['Poppins']">Save</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export const ReportScoreCard = ({
  companyName = 'Tata Consultancy Services Ltd.',
  stockScore = '9/10',
  pdfReport = 'Report',
  earnings = 10,
  fundamentals = 5,
  relativeValuation = 8,
  risk = 4,
  priceMomentum = 'NR'
}: ReportScoreCardProps) => {
  const progressBars = [
    { label: 'Earnings', value: earnings, maxValue: 10, color: 'var(--color-mofsl-earnings-green)' },
    { label: 'Fundamentals', value: fundamentals, maxValue: 10, color: 'var(--color-mofsl-fundamentals-orange)' },
    { label: 'Relative Valuation', value: relativeValuation, maxValue: 10, color: 'var(--color-mofsl-earnings-green)' },
    { label: 'Risk', value: risk, maxValue: 10, color: 'var(--color-mofsl-risk-red)' },
    { label: 'Price Momentum', value: priceMomentum === 'NR' ? 0 : parseInt(priceMomentum), maxValue: 10, color: 'var(--color-mofsl-neutral-gray)', isNR: priceMomentum === 'NR' }
  ];

  const legendItems = [
    { label: 'No Rating', color: 'var(--color-mofsl-legend-gray)' },
    { label: 'Negative', color: 'var(--color-mofsl-risk-red)' },
    { label: 'Neutral', color: 'var(--color-mofsl-fundamentals-orange)' },
    { label: 'Positive', color: 'var(--color-mofsl-legend-positive)' }
  ];

  return (
    <div className="flex flex-col items-start p-0 w-full h-full rounded-xl overflow-hidden" style={{ boxShadow: '0px 0px 18px 1.4px var(--color-mofsl-gray-shadow)' }}>
      {/* Header */}
      <div className="flex flex-col items-start p-3 px-4 gap-3 w-full h-[99px] bg-white rounded-t-xl">
        <div className="flex flex-col items-start gap-1.5 w-full h-[75px]">
          <div className="flex flex-row items-center gap-4 w-full h-[75px]">
            <div className="w-[57px] h-[57px] bg-white border border-[var(--color-mofsl-gray-border)] rounded-full flex items-center justify-center">
              <img src="/TCS logo.png" alt="TCS Logo" className="w-[31.35px] h-[19.29px] object-cover" />
            </div>
            <div className="flex flex-col justify-center items-start gap-1.5 flex-1 h-[60px]">
              <h3 className="text-xl font-bold leading-[30px] text-[var(--color-mofsl-primary-color)] font-['Poppins'] h-[60px]">
                {companyName}
              </h3>
            </div>
            <div className="flex flex-col items-start p-2 gap-2 w-[75px] h-[75px] bg-[var(--color-mofsl-blue-primary)] rounded-md relative">
              <div className="flex flex-col justify-center items-center w-[59px] h-[36px]">
                <span className="text-[22px] font-bold leading-[33px] text-white font-['Poppins']">
                  {stockScore}
                </span>
                <span className="text-[10px] font-normal leading-[15px] text-center text-white font-['Poppins'] -mt-1">
                  Stock Score
                </span>
              </div>
              <div className="absolute bottom-0 left-0 right-0 flex flex-row justify-center items-center p-2 gap-1 h-[24px] bg-[var(--color-mofsl-primary-color)] rounded-b-md">
                <div className="flex flex-row justify-center items-center gap-1 w-[53.86px] h-[15px]">
                  <div className="w-[13.86px] h-[15px] relative">
                    <svg width="14" height="15" viewBox="0 0 14 15" fill="none">
                      <rect x="0" y="5.5" width="13.86" height="7.04" fill="var(--color-mofsl-report-flag)"/>
                      <rect x="0.83" y="7.28" width="0.58" height="3.24" fill="white"/>
                      <rect x="1.5" y="7.28" width="0.58" height="3.24" fill="white"/>
                      <rect x="2.23" y="7.28" width="0.58" height="3.24" fill="white"/>
                    </svg>
                  </div>
                  <span className="text-[10px] font-normal leading-[15px] text-white font-['Poppins']">
                    {pdfReport}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className="w-full h-px bg-[var(--color-mofsl-gray-border)]"></div>

      {/* Content */}
      <div className="flex flex-col justify-end items-start p-4 gap-1.5 w-full h-[222px] bg-white rounded-b-xl">
        <div className="flex flex-row items-start gap-4 w-full h-[190px]">
          {/* Progress Bars */}
          <div className="flex flex-col items-start gap-0 flex-1 h-[190px] pr-4">
            {progressBars.map((bar, index) => (
              <div key={index} className="flex flex-col items-start gap-1.5 w-full h-[38px]">
                <span className="text-xs font-normal leading-[18px] text-black font-['Poppins'] w-full h-[18px]">
                  {bar.label}
                </span>
                <div className="relative w-[90%] h-[20px]">
                  <div className="absolute w-full h-1 bg-[var(--color-mofsl-neutral-gray)] rounded-lg top-0"></div>
                  {!bar.isNR && (
                    <div 
                      className="absolute h-1 rounded-lg top-0" 
                      style={{ 
                        backgroundColor: bar.color, 
                        width: `${(bar.value / bar.maxValue) * 100}%` 
                      }}
                    ></div>
                  )}
                  <div 
                    className="absolute flex flex-col justify-center items-center gap-2.5 w-[27.05px] h-[20px] bg-black rounded-[70px] -top-[8px]"
                    style={{ 
                      left: bar.isNR ? '0px' : `${((bar.value / bar.maxValue) * 100) - 5}%` 
                    }}
                  >
                    <span className="text-[10px] font-bold leading-3 text-white font-['Roboto']">
                      {bar.isNR ? 'NR' : bar.value}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Legend */}
          <div className="flex flex-col items-start gap-3 w-auto h-[108px] flex-shrink-0">
            {legendItems.map((item, index) => (
              <div key={index} className="flex flex-row items-start gap-1.5 w-[72px] h-[18px]">
                <div className="flex flex-row items-start pt-1 gap-2.5 w-[7px] h-[15px]">
                  <div className="w-[7px] h-[7px] rounded-full" style={{ backgroundColor: item.color }}></div>
                </div>
                <span className="text-xs font-normal leading-[18px] text-black font-['Poppins'] w-[58px] h-[18px]">
                  {item.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};