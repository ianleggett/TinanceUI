import Container from '@material-ui/core/Container';
import Divider from '@material-ui/core/Divider';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import dayjs from 'dayjs';
import { useTranslation } from 'react-i18next';

import { useAppConfigState } from '../components';

const useStyles = makeStyles((theme) => ({
  root: {
    margin: '64px 0',
    padding: '32px 16px',
  },
  title: {
    textAlign: 'center',
    marginBottom: theme.spacing(1),
  },
  divider: {
    marginTop: theme.spacing(4),
    marginBottom: theme.spacing(4),
  },
  article: {
    lineHeight: 1.5,
  },
  updated: {
    display: 'block',
    textAlign: 'center',
    marginTop: theme.spacing(2),
  },
}));

const terms = {
  'en': 'please select your language',
  'en-US':
    '<h1>Website Terms of Use</h1>' +
    '<p>This page sets out the terms of use of visitors to this website. By using this website, you accept all of its terms (including these Terms of Use and the Privacy Policy). A reference in these Terms of Use to ‘we’, ‘us’ or ‘our’ means Swap-Safe Ltd.</p>' +
    '<p>We reserve the right to update or amend these Terms of Use at any time. You should check this page from time to time to make sure you are aware of any changes.</p>' +
    '<h2>Website content and Use by Visitors</h2>' +
    '<p>We use reasonable endeavours to ensure that the information we include on this website is accurate and up-to-date. However, we cannot guarantee the accuracy, currency or completeness of the information provided and we accept no responsibility for errors in the content at any time.</p>' +
    '<p>We do not guarantee that use of our website will be uninterrupted or error-free.</p>' +
    '<p>To the extent permitted by law, all liability is excluded for any loss (including indirect loss), damages or injury resulting from your access to (or inability to access) or use of this website, or as a consequence of any content or information obtained from or through this website.</p>' +
    '<p>You may link to this website provided you do so in a way that accurately indicates that the link is to the swap-safe.com website and is not misleading.</p>' +
    '<p>This website may contain links or references to third party sites. We are not responsible or liable for the content of those sites and your access to and use of those sites is at your own risk. Any links are provided for convenience only, and do not indicate any endorsement or recommendation by us.</p>' +
    '<p>You agree to only use this website in accordance with its terms and any applicable laws. You may be held personally liable for any unlawful use of this website.</p>' +
    '<p>If you think any content on this website is inappropriate or unlawful or infringes your rights, please contact us at support@swap-safe.com</p>' +
    '<p>Any personal information collected by us through your use of this website will be dealt with in accordance with our Privacy Policy.</p>' +
    '<p>The terms of this website will be governed by and construed in accordance with the laws in force in the Cayman Islands and you unconditionally submit to the non-exclusive jurisdiction of the courts of the Cayman Islands.' +
    '<p>Although this website may be accessed outside of the Cayman Islands, we make no representation that the content complies with the laws of any other country. If you access this website from outside the Cayman Islands, you are solely responsible for ensuring compliance with your local laws and for any reliance on our website content. If your local laws do not permit you to access services provided by SwapSafe, then you must not access this website.</p>' +
    '<h2>Service Terms</h2>' +
    '<ol>' +
    '<li><b>Introduction</b><br/>' +
    '<ul>' +
    '<li>This section sets out the service terms for SwapSafe account-holders. By signing up for a SwapSafe account, you accept all of these terms. A reference in these Service Terms to ‘we’, ‘us’ or ‘our’ means SwapSafe Ltd and its directors and officers.</li>' +
    '<li>SwapSafe is a service that enables its users to find others interested in trading cryptocurrencies for local currencies and vice versa. We do not facilitate the exchange of fiat currency for a digital currency, and we do not provide a digital currency exchange service. SwapSafe does not purchase cryptocurrencies from, or sell cryptocurrencies to, its account holders.</li>' +
    '<li>Nothing on our website is intended to constitute legal or financial advice. The information on our website, and the posting and viewing of any the information on our website, should not be construed as, and should not be relied upon for, legal, financial or taxation advice in any circumstance.</li>' +
    '</ul>' +
    '</li>' +
    '<li><b>Your Account</b><br/>' +
    '<ul>' +
    '<li>You will need to register and create an account in order to access the SwapSafe platform as a user. When you register as a member and create your profile, you will need to provide us with your email address, and pick a username and password. You must log in using your username and password to access the services.</li>' +
    '<li>You must maintain the confidentiality of your password and you are responsible for all activities that are conducted through your account, whether or not you have authorised such use.</li>' +
    '<li>We currently do not allow usernames to be changed.</li>' +
    '<li>If you wish to delete your account, please open a support ticket with your request.</li>' +
    '<li>You must be at least 18 years old to sign up for a SwapSafe account. If you sign up for an account, you warrant that you are at least 18 years old.</li>' +
    '</ul>' +
    'We may suspend or delete your account if:' +
    '<ul>' +
    '<li>we consider that you are using the SwapSafe platform to scam other users or for any other unlawful purpose;</li>' +
    '<li>we receive reports that you are communicating offensive, abusive, unlawful, defamatory, indecent or inappropriate messages to other users;</li>' +
    '<li>SwapSafe is required by law to do so;</li>' +
    '<li>there is any change in law that adversely affects SwapSafe’ operating model or would make it unlawful to continue the service without materially changing the SwapSafe platform or regulatory licence required to operate; and</li>' +
    '<li>for any other reason in our absolute discretion.</li>' +
    '</ul>' +
    'Once your account is deleted, we destroy any information we hold in relation to it after any legal requirement imposed on SwapSafe to retain it has expired. After suspension of your account, you are entitled to limited access for the purpose of managing existing trades however you may not open new trades or post to the marketplace.' +
    '</li>' +
    '<li><b>Offers</b>' +
    '<ul>' +
    '<li>SwapSafe users may post offers to buy or sell cryptocurrencies in exchange for local currencies using the marketplace. Offers on the marketplace are made publicly available, and can be viewed by anyone who accesses the website.</li>' +
    '<li>When an offer is displayed, we may also display symbols next to the offeror’s username such as a symbol to indicate the offeror’s trade activity, response rate or standard hours.</li>' +
    "<li>Offers displayed on the SwapSafe website clearly show SwapSafe's fee for each party. </li>" +
    '<li>SwapSafe reserves the right to delete offers from the marketplace at its discretion. Generally, it will delete offers if they appear to be unlawful, non-genuine, fraudulent, spam or are otherwise incorrect.</li>' +
    '</ul>' +
    '</li>' +
    '<li><b>Trades</b>' +
    '<ul>' +
    '<li>The parties of a trade are referred to as "buyers" (those who want to trade local currency for cryptocurrency) and "sellers" (those who want to trade cryptocurrency for local currency).</li>' +
    "<li>When trading with a user located with the aid of SwapSafe's services, payment instructions can only be communicated directly between the buyer and seller. We do not have any bank accounts that hold users' funds, nor do we facilitate or escrow any local currency payments between buyers and sellers. At no point during the course of a trade does the buyers' or sellers' cryptocurrency enter our control, unless we direct cryptocurrency to resolve a dispute.</li>" +
    '<li>USDT trades are conducted via the Ethereum distributed computing network, which we cannot and do not control. When a seller sends USDT to a buyer during the course of a trade, the seller transfers USDT directly to an escrow smart contract on the Ethereum blockchain. SwapSafe cannot access USDT held in escrow without explicit digital permission from the buyer or seller. It is impossible for us to have USDT directed to anyone other than the seller or the buyer as per the code of the smart contract.</li>' +
    '<li></li>' +
    '</ul>' +
    '</li>' +
    '<li><b>Terms of the transaction</b><br/>' +
    'Once cryptocurrency is transferred into escrow, the trade should proceed in accordance with the SwapSafe terms. This will ordinarily require:' +
    '<ul>' +
    '<li>buyer should make fiat currency payment;</li>' +
    '<li>once fiat currency payment is received in full and in cleared funds, the cryptocurrency held in escrow must be released.</li>' +
    '<li>If the buyer does not represent that fiat currency payment is made within a defined time period, the escrow will be cancelled and USDT returned to the seller. The buyer may cancel the escrow at any time.</li>' +
    '</ul>' +
    'Sales between buyers and sellers are subject to:' +
    '<ul>' +
    "<li>the payment of SwapSafe's fee;</li>" +
    '<li>the process for arbitration set out in these Service Terms;</li>' +
    '</ul>' +
    '</li>' +
    '<li><b>Security</b><br/>' +
    'You must comply with all reasonable security requirements prescribed from time to time by SwapSafe.' +
    '</li>' +
    '<li><b>Disputes</b><br/>' +
    'A dispute may arise if:' +
    '<ul>' +
    '<li>a party to a trade transfers local currency but the escrow isn’t released;</li>' +
    '<li>local currency payment isn’t received and the cryptocurrency remains in escrow;</li>' +
    '<li>local currency is only part paid.</li>' +
    '</ul>' +
    'Either party may refer the dispute to SwapSafe.' +
    '<ul>' +
    '<li>The party referring the dispute to SwapSafe must give SwapSafe access to all information required by SwapSafe to resolve the dispute, including evidence of payments. SwapSafe will review the evidence and it will direct the cryptocurrency to the party who in SwapSafe’ reasonable opinion is entitled to own it under the terms of sale.</li>' +
    '<li>Parties must respond to SwapSafe’ requests for information promptly (and at least within 24 hours). If a party does not respond to a request within that timeframe, SwapSafe may resolve the escrow in favour of the other party to the dispute.</li>' +
    '<li>The parties agree that except in cases of gross negligence or fraud, SwapSafe’ decision is final and binding on the parties and there is no appeal from such decision.</li>' +
    '<li>SwapSafe reserves the right to refuse to resolve a dispute where SwapSafe, in its sole discretion, considers that:<br>' +
    'the issue is best resolved through other methods;<br/>' +
    'one or both parties have not provided all required or requested information;<br/>' +
    'the ownership of cryptocurrency is not clear from the information provided;<br/>' +
    'the contract between the parties is unlawful;<br/>' +
    'a party is acting unlawfully or fraudulently;<br/>' +
    'SwapSafe has a legal obligation to do so; or<br/>' +
    'directing cryptocurrency to a party would cause SwapSafe to breach any law.<br/><br/>' +
    'Where SwapSafe exercises its right to refuse to resolve a dispute, SwapSafe will notify both parties of this. Either party may then apply for a court order resolving the dispute.' +
    '</li>' +
    '<li>If a party provides a copy of a court order to SwapSafe along with access to a digital signature that allows SwapSafe limited control of the escrow, SwapSafe will resolve the escrow in accordance with the court order.</li>' +
    '<li>This process for resolving disputes is incorporated in all contracts between buyers and sellers arranged through SwapSafe.</li>' +
    '</ul>' +
    '</li>' +
    '<li><b>SwapSafe Fees</b>' +
    '<ul>' +
    '<li>SwapSafe fees at time of publishing are a 0.1% fee for the maker (the person who placed the offer listing) and 0.1% for the taker (the person responding to the offer). The fee is charged in cryptocurrency.</li>' +
    '<li>The actual amount is clearly shown when creating or accepting the offer.</li>' +
    '</ul>' +
    '</li>' +
    '<li><b>Taxes</b><br/>' +
    'You are responsible for determining what taxes apply to any trades you conduct with other SwapSafe users. You must pay for all taxes applicable to all trades in which you participate.<br/>' +
    'You indemnify SwapSafe for any claim, loss or damage arising from your failure to pay applicable taxes.' +
    '</li>' +
    '<li><b>Risks</b>' +
    '<ul>' +
    '<li>Cryptocurrency transfers are irreversible. If you release or send cryptocurrency to somebody else, it is generally not possible for SwapSafe, nor yourself, to recover the funds. This also applies to sending cryptocurrency to an incorrect address. You transfer any cryptocurrency at your own risk.</li>' +
    '<li>If someone gains access to your account and uses your wallet, we will have no way to recover your funds.</li>' +
    '<li>We strongly recommend that if you do not have a strong understanding of the underlying "blockchain" technology that supports cryptocurrencies, you do not use our services. Cryptocurrencies can be subject to extreme price volatility. You should consider your financial circumstances and tolerance to risk before acquiring and trading in cryptocurrencies.</li>' +
    '</ul>' +
    '</li>' +
    '<li><b>Disclaimer</b>' +
    'SwapSafe does not facilitate or provide brokerage, exchange, payment, escrow, remittance or merchant services.<br/><br/>' +
    'SwapSafe is only an introductory and information service, and, to the maximum extent permissible by law, is not responsible for any actions of its users including, without limitation, representations by any users regarding funds (cryptocurrency or currency) having been transferred or any ownership of cryptocurrency or funds.<br/><br/>' +
    'To the maximum extent permitted by law, SwapSafe does not guarantee the quality or fitness for purpose of its services. SwapSafe is provided on an "as is" and “as available” basis and you agree to use it at your sole risk. While we strive to make the services available to you at all times, we do not make any representations as to the availability of the services, or that your access or use of the website will be uninterrupted or timely. There may be delays, failures, errors, omissions or loss of transmitted information.<br/><br/>' +
    'We make no warranties, claims or guarantees related to any of our users, including but not limited to:' +
    '<ul>' +
    '<li>the merchantability or fitness of the user;</li>' +
    '<li>the identity of the user;</li>' +
    '<li>the location of the user;</li>' +
    '<li>the reliability and timeliness of the user;</li>' +
    '<li>the accuracy of any information the user presents; or</li>' +
    '<li>the accuracy of any information we provide about the user.</li>' +
    '</ul>' +
    'To the maximum extent permitted by law, we make no guarantees to the safety, reliability, availability or longevity of any of the data we collect or store.' +
    '</li>' +
    '<li><b>Limitation of liability and indemnity</b>' +
    'You indemnify SwapSafe and hold SwapSafe harmless against all loss, claims, actions, liability, damage, costs (including legal fees on a solicitor and client basis), expenses and penalties arising directly or indirectly from any:' +
    '<ul>' +
    '<li>breach by you of these Service Terms;</li>' +
    '<li>unauthorised use of your SwapSafe account;</li>' +
    '<li>act or omission (including any negligence, unlawful conduct, wilful misconduct or fraud) by you in relation to your use of SwapSafe’ services;</li>' +
    '<li>third party claim against us in relation to your use of SwapSafe’ services;</li>' +
    '<li>any action taken by SwapSafe at your request in respect of your account, trade or dispute;</li>' +
    '<li>any inaction or delay on your part in respect of any dispute, including any failure by you to respond to a request for information by us within the time required;</li>' +
    '<li>any failure by you to comply with any reasonable recommendation made by SwapSafe;</li>' +
    '<li>infringement of intellectual property rights by you; and</li>' +
    '<li>any actions or inactions of third party service providers.</li>' +
    '</ul>' +
    'Except in the case of gross negligence or fraud in resulting a dispute, and to the fullest extent permitted by law, SwapSafe is not liable for any breach of these Service Terms, or any act or omission (including any negligent act or omission) of SwapSafe in connection with these Service Terms or any services supplied by SwapSafe.<br/><br/>' +
    'Nothing in these Service Terms restrict, exclude or modify any rights that cannot be excluded under any applicable law. If we are liable for a breach of a consumer guarantee (or any other term implied by law) and that liability cannot, by law, be excluded but can be limited, our liability is, to the fullest extent permitted by law, limited to any one or more of the following as we determine in our absolute discretion:' +
    '<ul>' +
    '<li>resupplying the services; or</li>' +
    '<li>paying the costs of having the services resupplied.</li>' +
    '</ul>' +
    'If we were grossly negligent in resolving a dispute, then our liability is capped to the lower of AUD$10,000 or the fees, commissions and charges paid to us in respect of the transaction(s) giving rise to the claim.<br/>' +
    'If we are fraudulent in providing a service under these Service Terms, then our liability is uncapped.<br/><br/>' +
    'Under no circumstances, including in cases of gross negligence or fraud, are we liable to you for any consequential loss suffered by you (including any loss of profit).		' +
    '</li>' +
    '<li><b>Language</b>' +
    'These Service Terms may be translated into other languages, however the official language of these terms is English. Translations may not accurately represent the information communicated in the English language.' +
    '</li>' +
    '<li><b>Notices</b><br/>' +
    'You agree that an email sent to the email address nominated when you created your account is a valid notice under these Service Terms.<br/>' +
    'You should exercise reasonable caution when reviewing emails and SMSs purporting to originate from SwapSafe as emails can be vulnerable to phishing, spoofing and additional viruses.' +
    '</li>' +
    '<li><b>Changes to these terms</b><br/>' +
    'We reserve the right, at our sole discretion, to update, change or replace any part of these Service Terms by posting updates and changes to our website. If there is a change which has a material adverse impact on you, we will notify you by emailing you and providing 30 days’ notice. If you do not agree to the changes, your only remedy is to discontinue using the services.<br/><br/>' +
    'It is your responsibility to check our website periodically for changes. Your continued use of or access to our website or the services following the posting of any changes to these Service Terms constitutes acceptance of those changes.' +
    '</li>' +
    '<li><b>Terms that survive account closure</b><br/>' +
    'The following terms in these Service Terms continue to apply after the closure of your account:<br/><br/>' +
    'Clause 7 – Disputes;<br/>' +
    'Clause 8 – SwapSafe fees; and<br/>' +
    'Clause 12 – Limitation of liability and indemnity.' +
    '</li>' +
    '<li><b>Entire understanding</b><br/>' +
    'These Service Terms contain the entire understanding between the parties as to the subject matter of these terms.' +
    '</li>' +
    '<li><b>Contact</b><br/>' +
    'Please send any questions, comments, issues, or general correspondence via email to support@swap-safe.com.' +
    '</li>' +
    '</ol>',
  'zh-CN':
    '<h3>标题 01</h3><p>本网站内所有内容并不反映任何本网站之意见及观点。本网站内容有梅斯医学原创信息（来源标注为梅斯医学），以及用户自行产生的内容（UGC内容）， 以及部分授权转载内容。对于用户自行产生内容，本站仅作存储目的，不对内容本身的版权，合法性和权威性进行判定，如果有违规，由原始发布用户承担。本站部分资料或资源来自网友自发上传或网上收集，版权均归原作者所有，如有侵权请与联系我们，本站将在2日内删除。本站对资料或信息版权及其后果免责。</p><p>本网站不完全保证网站内容的真实性，准确性，完整性，也不保证未来内容不会发生变更，信息仅供专业的医生参考！本网站医学内容仅供参考，不作为诊断及医疗依据。涉及到疾病诊疗，以及健康指导的意见，请咨询当地专科医生。凡因为观看本站信息而作出医疗或健康推荐，发生的任何后果，与本网站无关。</p><h3>标题 02</h3><p>本站对资料、图片版权、或信息版权及其后果均不承担任何法律责任。发布的文件中若含有版权信息、版权图片、版权文件，由原始发布人、或原始作者承担责任以及后果。如果版权方要求本站删除，本站将根据版权方要求进行删除，并进行证据保全。</p><p>本网站如因系统维护或升级而需暂停服务时，将事先公告。若因线路及非本公司控制范围外的硬件故障或其它不可抗力而导致暂停服务，于暂停服务期间造成的一切不便与损失，本网站不负任何责任。</p>',
  'zh-TW':
    '<h3>標題01</h3><p>本網站內所有內容並不反映任何本網站之意見及觀點。本網站內容有梅斯醫學原創資訊（來源標注為梅斯醫學），以及用戶自行產生的內容（UGC內容），以及部分授權轉載內容。對於用戶自行產生內容，本站僅作存儲目的，不對內容本身的版權，合法性和權威性進行判定，如果有違規，由原始發佈用戶承擔。本站部分資料或資源來自網友自發上傳或網上收集，版權均歸原作者所有，如有侵權請與聯繫我們，本站將在2日內删除。本站對資料或資訊版權及其後果免責。</p><p>本網站不完全保證網站內容的真實性，準確性，完整性，也不保證未來內容不會發生變更，資訊僅供專業的醫生參攷！本網站醫學內容僅供參考，不作為診斷及醫療依據。涉及到疾病診療，以及健康指導的意見，請諮詢當地專科醫生。凡因為觀看本站資訊而作出醫療或健康推薦，發生的任何後果，與本網站無關。</p><h3>標題02</h3><p>本站對資料、圖片版權、或資訊版權及其後果均不承擔任何法律責任。發佈的檔案中若含有版權資訊、版權圖片、版權檔案，由原始發佈人、或原始作者承擔責任以及後果。如果版權方要求本站删除，本站將根據版權方要求進行删除，並進行證據保全。</p><p>本網站如因系統維護或陞級而需暫停服務時，將事先公告。若因線路及非本公司控制範圍外的硬體故障或其它不可抗力而導致暫停服務，於暫停服務期間造成的一切不便與損失，本網站不負任何責任。</p>',
  'vi-VN':
    '<h3>Title 01</h3><p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quos blanditiis tenetur unde suscipit, quam beatae rerum inventore consectetur, neque doloribus, cupiditate numquam <strong>dignissimos</strong> laborum fugiat deleniti? Eum quasi quidem quibusdam.</p><p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quos blanditiis tenetur unde <em>suscipit</em>, quam beatae rerum inventore consectetur, neque <a href="/">doloribus</a>, cupiditate numquam dignissimos laborum fugiat deleniti? Eum quasi quidem quibusdam.</p><h3>Title 02</h3><p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quos blanditiis tenetur unde suscipit, quam beatae rerum inventore consectetur, neque doloribus, cupiditate numquam dignissimos laborum fugiat deleniti? Eum quasi quidem quibusdam.</p><p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quos blanditiis tenetur unde suscipit, quam beatae rerum inventore consectetur, neque doloribus, cupiditate numquam dignissimos laborum fugiat deleniti? Eum quasi quidem quibusdam.</p>',
};

const TermsPage: React.FC = () => {
  const classes = useStyles();
  const { t } = useTranslation();
  const { lang } = useAppConfigState();

  return (
    <Container disableGutters>
      <Paper className={classes.root}>
        <Typography component="h2" variant="h3" color="primary" className={classes.title}>
          {t('Terms & Conditions')}
        </Typography>
        <Divider className={classes.divider} />
        <article
          className={classes.article}
          dangerouslySetInnerHTML={{
            __html: terms[lang],
          }}
        />
        <Typography variant="subtitle2" color="textSecondary" className={classes.updated}>
          - Updated at {dayjs().format('YYYY-MM-DD HH:mm:ss')} -
        </Typography>
      </Paper>
    </Container>
  );
};

export default TermsPage;
