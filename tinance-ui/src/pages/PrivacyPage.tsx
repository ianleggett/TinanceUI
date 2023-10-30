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

const privacy = {
  'en-US':
    '<h1>Privacy Policy</h1>' +
    '<p>This Privacy Policy concerns any personal information of yours which is provided to us.</p>' +
    '<p>Personal information is any information about an identified individual or an individual who is reasonably identifiable, whether the information is true or not and whether the information is recorded in a material form or not.</p>' +
    '<p>SwapSafe collects, uses, and discloses personal information in accordance with this Privacy Policy.</p>' +
    '<h2>What personal information do we collect and why?</h2>' +
    '<p>The types of personal information we may collect include:</p>' +
    '<ul>' +
    '<li>from users who sign up for a SwapSafe account – email addresses, names (if used as a username), trade activity (such as amounts and local currencies), phone numbers, and information about a user’s response time.</li>' +
    '<li>from website visitors – IP addresses, website preferences, traffic sources and device information;</li>' +
    '<li>if you contact us with a query – your contact details.</li>' +
    '</ul>' +
    '<p>If we are not provided with the information that we request, then we may not be able to provide services to you or respond to your query.</p>' +
    '<p>The personal information you provide us may be used for a number of purposes connected with our business operations, which include to:</p>' +
    '<ul>' +
    '<li>provide the SwapSafe services,</li>' +
    '<li>respond to any requests from you;</li>' +
    '<li>better understand your needs in relation to cryptocurrency trading;</li>' +
    '<li>develop and improve the quality and scope of the services we provide, and seek your feedback;</li>' +
    '<li>store choices you previously have made on the site, including when you are not logged in, to improve your experience;</li>' +
    '<li>better understand our how website visitors use the website and how SwapSafe users use the service; and</li>' +
    '<li>to send you marketing messages about our products and services.</li>' +
    '</ul>' +
    '<p>We may send you messages by email, SMS, or push notification, with updates about our services, news related to cryptocurrency or decentralised finance, and marketing messages. You always have the right to opt-out of receiving such information. You may exercise that right by clicking the "unsubscribe" link in a message we send you, or contacting us using the details below.</p>' +
    '<p>We will not use your information for purposes other than those described above unless we have your consent or as permitted by law (including for law enforcement or public health and safety reasons).</p>' +
    '<h2>Passive information collection</h2>' +
    '<p>As you navigate through this website, certain information can be passively collected (that is, gathered without you actively providing the information) through various technologies, such as cookies, internet tags or web beacons and navigational data collection. You can manage passive information collection settings in the settings of your browser.</p>' +
    '<p>This website may use and combine such passively collected information to provide better services to website visitors, customise the website based on your preferences, compile and analyse statistics and trends and otherwise administer and improve the website for your use.</p>' +
    '<h2>How we collect your personal information</h2>' +
    '<p>We generally collect personal information directly from you, for example through online forms or when you contact us.</p>' +
    '<p>We may also collect personal information through trade activity, server log files and passive information collection technologies.</p>' +
    '<h2>Sharing your personal information</h2>' +
    '<p>We also may disclose your personal information to:</p>' +
    '<ul>' +
    '<li>others in accordance with a request made by you – for example, if your username is your real name, then we will list this when you ask to be listed on the SwapSafe marketplace;</li>' +
    '<li>our third party service providers engaged by us to perform business and technology services, when reasonably required;</li>' +
    '<li>law enforcement bodies – both if required by a warrant or voluntarily if we suspect you have engaged in fraud or misuse; and</li>' +
    '<li>persons to whom we are required by law to disclose information.</li>' +
    '</ul>' +
    '<p>When making disclosures to our service providers, we take reasonable steps to ensure that they are bound by privacy obligations.</p>' +
    '<p>Unless you consent, we otherwise do not disclose your personal information to third parties.</p>' +
    '<h2>How long is my personal information kept?</h2>' +
    '<p>You can request to delete your personal information by contacting us using the details below.</p>' +
    '<p>After you delete your account, most information we have collected about you will be deleted or anonymized within 180 days, however we may retain some information for up to 5 years following the date of your request.</p>' +
    '<p>We may retain your personal information for a longer period only if there is a legal obligation for us to do so.</p>' +
    '<h2>Access and correction</h2>' +
    '<p>You may request access to any of the personal information we hold about you by contacting us using the details below.. We reserve the right to charge a reasonable fee for the costs of retrieval and supply of any requested information.</p>' +
    '<p>We will take all reasonable steps to ensure that the personal information we collect, use or disclose is accurate, complete and up to date. To ensure your personal information is accurate, please notify us of any errors or changes to your personal information and we will take appropriate steps to update or correct such information in our possession.</p>' +
    '<h2>Storage and security</h2>' +
    '<p>We will take all reasonable precautions to safeguard your information from loss, misuse, unauthorised access, modification, disclosure or destruction. We may store your files as electronic records. We implement a range of electronic security measures to protect the personal information that we hold, including using secured databases using industry-standard network security practices.</p>' +
    '<p>You should keep in mind that no internet transmission is ever completely secure or error-free.</p>' +
    '<h2>Links to other websites</h2>' +
    '<p>This website may contain links or references to other websites to which this Privacy Policy may not apply. You should check their own privacy policies before providing your personal information.</p>' +
    '<h2>Notifiable data breaches scheme</h2>' +
    '<p>In the event of any loss or unauthorised access or disclosure of your personal information that is likely to result in serious harm to you, we will investigate and notify you as soon as practicable.</p>' +
    '<h2>Complaints</h2>' +
    '<p>If you have any questions or concerns about our collection, use or disclosure of personal information, or if you believe we have not complied with this Privacy Policy, please contact us as set out below. We will investigate the complaint and determine whether a breach has occurred and what action, if any, to take.</p>' +
    '<p>SwapSafe takes all privacy complaints seriously and will aim to resolve any such complaint in a timely and efficient manner.</p>' +
    '<h2>How to contact us</h2>' +
    '<p>If you wish to exercise your right to opt-out of receiving our marketing materials, or you have any questions or concerns about this Privacy Policy or our information practices, please contact us at: <a href="mailto:support@swap-safe.com">support@swap-safe.com</a></p>' +
    '<h2>Changes to this Privacy Policy</h2>' +
    '<p>Our Privacy Policy may change from time to time as updated on this website. Before providing us with personal information, please check this Policy on our website for any changes.</p>',
  'zh-CN':
    '<h3>标题 01</h3><p>本网站内所有内容并不反映任何本网站之意见及观点。本网站内容有梅斯医学原创信息（来源标注为梅斯医学），以及用户自行产生的内容（UGC内容）， 以及部分授权转载内容。对于用户自行产生内容，本站仅作存储目的，不对内容本身的版权，合法性和权威性进行判定，如果有违规，由原始发布用户承担。本站部分资料或资源来自网友自发上传或网上收集，版权均归原作者所有，如有侵权请与联系我们，本站将在2日内删除。本站对资料或信息版权及其后果免责。</p><p>本网站不完全保证网站内容的真实性，准确性，完整性，也不保证未来内容不会发生变更，信息仅供专业的医生参考！本网站医学内容仅供参考，不作为诊断及医疗依据。涉及到疾病诊疗，以及健康指导的意见，请咨询当地专科医生。凡因为观看本站信息而作出医疗或健康推荐，发生的任何后果，与本网站无关。</p><h3>标题 02</h3><p>本站对资料、图片版权、或信息版权及其后果均不承担任何法律责任。发布的文件中若含有版权信息、版权图片、版权文件，由原始发布人、或原始作者承担责任以及后果。如果版权方要求本站删除，本站将根据版权方要求进行删除，并进行证据保全。</p><p>本网站如因系统维护或升级而需暂停服务时，将事先公告。若因线路及非本公司控制范围外的硬件故障或其它不可抗力而导致暂停服务，于暂停服务期间造成的一切不便与损失，本网站不负任何责任。</p>',
  'zh-TW':
    '<h3>標題01</h3><p>本網站內所有內容並不反映任何本網站之意見及觀點。本網站內容有梅斯醫學原創資訊（來源標注為梅斯醫學），以及用戶自行產生的內容（UGC內容），以及部分授權轉載內容。對於用戶自行產生內容，本站僅作存儲目的，不對內容本身的版權，合法性和權威性進行判定，如果有違規，由原始發佈用戶承擔。本站部分資料或資源來自網友自發上傳或網上收集，版權均歸原作者所有，如有侵權請與聯繫我們，本站將在2日內删除。本站對資料或資訊版權及其後果免責。</p><p>本網站不完全保證網站內容的真實性，準確性，完整性，也不保證未來內容不會發生變更，資訊僅供專業的醫生參攷！本網站醫學內容僅供參考，不作為診斷及醫療依據。涉及到疾病診療，以及健康指導的意見，請諮詢當地專科醫生。凡因為觀看本站資訊而作出醫療或健康推薦，發生的任何後果，與本網站無關。</p><h3>標題02</h3><p>本站對資料、圖片版權、或資訊版權及其後果均不承擔任何法律責任。發佈的檔案中若含有版權資訊、版權圖片、版權檔案，由原始發佈人、或原始作者承擔責任以及後果。如果版權方要求本站删除，本站將根據版權方要求進行删除，並進行證據保全。</p><p>本網站如因系統維護或陞級而需暫停服務時，將事先公告。若因線路及非本公司控制範圍外的硬體故障或其它不可抗力而導致暫停服務，於暫停服務期間造成的一切不便與損失，本網站不負任何責任。</p>',
  'vi-VN':
    '<h3>Title 01</h3><p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quos blanditiis tenetur unde suscipit, quam beatae rerum inventore consectetur, neque doloribus, cupiditate numquam <strong>dignissimos</strong> laborum fugiat deleniti? Eum quasi quidem quibusdam.</p><p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quos blanditiis tenetur unde <em>suscipit</em>, quam beatae rerum inventore consectetur, neque <a href="/">doloribus</a>, cupiditate numquam dignissimos laborum fugiat deleniti? Eum quasi quidem quibusdam.</p><h3>Title 02</h3><p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quos blanditiis tenetur unde suscipit, quam beatae rerum inventore consectetur, neque doloribus, cupiditate numquam dignissimos laborum fugiat deleniti? Eum quasi quidem quibusdam.</p><p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quos blanditiis tenetur unde suscipit, quam beatae rerum inventore consectetur, neque doloribus, cupiditate numquam dignissimos laborum fugiat deleniti? Eum quasi quidem quibusdam.</p>',
};

const PrivacyPage: React.FC = () => {
  const classes = useStyles();
  const { t } = useTranslation();
  const { lang } = useAppConfigState();

  return (
    <Container disableGutters>
      <Paper className={classes.root}>
        <Typography component="h2" variant="h3" color="primary" className={classes.title}>
          {t('Privacy Policy')}
        </Typography>
        <Divider className={classes.divider} />
        <article
          className={classes.article}
          dangerouslySetInnerHTML={{
            __html: privacy[lang],
          }}
        />
        <Typography variant="subtitle2" color="textSecondary" className={classes.updated}>
          - Updated at {dayjs().format('YYYY-MM-DD HH:mm:ss')} -
        </Typography>
      </Paper>
    </Container>
  );
};

export default PrivacyPage;
