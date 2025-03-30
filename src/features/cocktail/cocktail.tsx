import { useLocation } from 'react-router-dom';
import styles from './cocktail.module.css';
import { useGetCocktails } from './api';
import { MessageBox } from '../../base';
import { Fragment } from 'react';

export const Cocktail = () => {
    const location = useLocation();
    const cocktail = location.pathname.replace('/', '');
    const { data, error, isLoading } = useGetCocktails(cocktail);

    if (isLoading) {
        return <MessageBox message={'Loading...'} />;
    }
    if (error) {
        return <MessageBox message={`Error: ${error.message}`} />;
    }

    if (!data) {
        return (
            <MessageBox
                message={'Error: Drinks not found, try another Cocktail'}
            />
        );
    }

    return (
        <div className={styles.wrapper}>
            {data.map((drink) => (
                <section key={drink.idDrink}>
                    <h2 className={styles.title}>{drink.strDrink}</h2>
                    <section className={styles.header}>
                        <section>
                            <section>
                                <div>{drink.strCategory}</div>
                                <div>{drink.strAlcoholic}</div>
                                <div>{drink.strGlass}</div>
                            </section>
                            <section>
                                <h3>Instructions:</h3>
                                <div>{drink.strInstructions}</div>
                            </section>
                        </section>
                        {drink.strDrinkThumb && (
                            <img
                                className={styles.img}
                                src={drink.strDrinkThumb}
                                alt={drink.strDrink || 'drinkImg'}
                                loading="lazy"
                            />
                        )}
                    </section>
                    <section>
                        <h3>List of ingredients:</h3>
                        <section className={styles.ingredients}>
                            {drink.ingredients.map((ingredient) => (
                                <Fragment key={ingredient.ingredient}>
                                    <div>{ingredient.ingredient}</div>
                                    <div>{ingredient.measure}</div>
                                </Fragment>
                            ))}
                        </section>
                    </section>
                </section>
            ))}
        </div>
    );
};
