import styled from 'styled-components';
import { Link } from 'react-router-dom';

const Option = styled.li`
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    height: 100%;
    padding: 0 5px;
    cursor: pointer;
    min-width: 120px;
    font-size: 16px;
`;

const Options = styled.ul`
    display: flex;
`;

const StyledLink = styled(Link)`
    color: black;

    &:visited {
        color: #4280d8;
    }
    
    &:hover {
        color: #f86905;
        text-decoration-color: #4280d8;
    }
`;

const optionTexts = ['CATEGORIES', 'FAVORITES', 'SHELF'];

function HeaderOptions() {
    return (
        <Options>
            {optionTexts.map((text) => (
                <StyledLink to={`/${text.toLowerCase()}`} key={text}>
                    <Option><p>{text}</p></Option>
                </StyledLink>
            ))}
        </Options>
    );
}

export default HeaderOptions;
