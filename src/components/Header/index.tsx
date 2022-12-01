import { HeaderContainer, HeaderContent } from './styles';
import logoImg from '../../assets/Logo.png';


export function Header() {
  return (
    <HeaderContainer>
      <HeaderContent>
        <img src={logoImg} alt="" />
      </HeaderContent>
    </HeaderContainer>
  );
}
