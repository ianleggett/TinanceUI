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
    '<h3>Title 01</h3><p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quos blanditiis tenetur unde suscipit, quam beatae rerum inventore consectetur, neque doloribus, cupiditate numquam <strong>dignissimos</strong> laborum fugiat deleniti? Eum quasi quidem quibusdam.</p><p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quos blanditiis tenetur unde <em>suscipit</em>, quam beatae rerum inventore consectetur, neque <a href="/">doloribus</a>, cupiditate numquam dignissimos laborum fugiat deleniti? Eum quasi quidem quibusdam.</p><h3>Title 02</h3><p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quos blanditiis tenetur unde suscipit, quam beatae rerum inventore consectetur, neque doloribus, cupiditate numquam dignissimos laborum fugiat deleniti? Eum quasi quidem quibusdam.</p><p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quos blanditiis tenetur unde suscipit, quam beatae rerum inventore consectetur, neque doloribus, cupiditate numquam dignissimos laborum fugiat deleniti? Eum quasi quidem quibusdam.</p>',
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
