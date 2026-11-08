import { useTranslations } from "next-intl";

import "./page.scss";

export default function Page() {
  const t = useTranslations("App/Page");
  return (
    <div className="dashboard">
      <h1>{t('title')}</h1>
      <p>{t('subtitle', { name: 'Alex' })}</p>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer tristique nulla ut viverra tempus. Mauris consequat ante nisl, eu iaculis tellus pulvinar ac. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Phasellus id consequat dolor, nec lobortis sem. Cras ac augue nisl. Praesent et nunc ac elit fermentum convallis ut at quam. Interdum et malesuada fames ac ante ipsum primis in faucibus. Maecenas viverra fermentum dui, at ullamcorper odio dictum sit amet. Quisque eu mi egestas, laoreet enim quis, tincidunt ligula. Nulla sodales est massa, a pharetra risus venenatis non. Etiam vel mi interdum, molestie dui in, mattis elit.
      </p>
      <p>
        Donec suscipit porttitor sodales. Cras aliquet turpis vitae orci sagittis, ac tempus elit pellentesque. Aliquam leo sem, consectetur ut molestie venenatis, hendrerit sed lacus. Donec sollicitudin ac nibh vel tincidunt. Nunc nec pulvinar mauris, vitae scelerisque dolor. Sed ultricies ac nisi eget sodales. Nullam hendrerit nisl eget arcu auctor, non viverra nunc vulputate. Donec cursus lectus neque, efficitur condimentum metus sagittis sit amet. Pellentesque cursus nunc ut nisl lacinia cursus. Mauris suscipit, ipsum et sollicitudin placerat, arcu orci vehicula tortor, ut vehicula sapien velit vel diam. Maecenas at vulputate nunc.
      </p>
      <p>
        Nullam iaculis risus at ultricies ornare. Integer mauris libero, pulvinar id erat a, ullamcorper accumsan tellus. Phasellus ante dui, sollicitudin rhoncus dapibus quis, volutpat molestie arcu. Mauris pellentesque arcu ipsum, sit amet maximus libero feugiat sit amet. Sed cursus semper tortor vitae fringilla. Ut lobortis, risus eu fermentum pulvinar, magna massa laoreet eros, eu placerat dui odio eu augue. Fusce vitae semper leo. Aliquam laoreet nisl aliquam ante congue pretium.
      </p>
      <p>
        Etiam at ligula ante. Sed posuere at dui ut luctus. Nam pulvinar semper nisi vel iaculis. Aliquam luctus est eros, at auctor arcu venenatis vitae. Ut hendrerit orci ut augue rutrum, sed facilisis velit suscipit. Sed vel libero a tellus pretium viverra ut eget ex. Ut eu nisi elit. Phasellus ultricies ultrices dui. Praesent scelerisque, justo vel luctus lobortis, est est interdum justo, id dignissim lectus magna vitae dui. In malesuada at augue sit amet fringilla. Fusce turpis leo, efficitur quis magna in, pellentesque vestibulum mi. Curabitur enim orci, elementum in diam ut, suscipit hendrerit nunc. Nullam maximus purus et turpis finibus, sed condimentum nisi interdum. Ut rutrum feugiat maximus. Nulla imperdiet condimentum lorem eu pulvinar. Pellentesque sit amet malesuada elit, sed porta lacus.
      </p>
      <p>
        Nulla tempus tincidunt porta. Nullam varius enim felis, dictum molestie lacus lobortis at. Duis et tincidunt orci. Nulla vulputate neque vitae ipsum euismod consequat. Donec ullamcorper lorem quam, nec ullamcorper lacus pulvinar eu. Proin ornare tellus dui, feugiat ullamcorper dolor scelerisque vitae. Aenean porta a eros at eleifend. Duis imperdiet condimentum dui a venenatis. Nam mollis eros vehicula sem tempus, eu pharetra purus pellentesque. Duis fringilla libero urna, vitae suscipit felis pellentesque eget. Proin mattis dapibus dapibus.
      </p>
    </div>
  );
}
