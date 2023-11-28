import AdminThemeComponent from "@/components/admin/theme/AdminThemeComponent";
import { getThemeFull } from "@/app/api/theme/getTheme";

export default async function AdminIndex() {
  const themeFull = await getThemeFull();
  const string1 =
    "Coucou !! Ça y est j'ai enfin trouvé à résoudre le problème avec les images.";
  const string2 =
    "Tu peux commencer à mettre du contenu, la base de donnée est stable, ça ne sera pas perdu. Le traitement des images lorsque tu les enregistres va peut-être être long, dis-moi si c'est trop long (l'idée est de passer à un image qui idéalement ne devrait pas faire plus de 200 ko sans perdre pour autant trop de qualité, ce qui peut être long quand une image pèse plusieurs Mo.";
  const string3 =
    "J'ai implémenté la rubrique que j'ai appelée 'post' (plus approprié peut-être que 'article' où l'on attends presque nécessairement du texte. Tu peux y mettre autant de photos que tu veux, et le texte est facultatif, ou inversement d'ailleurs.";
  const string4 =
    "Il y a un petit beug (et sans doute d'autres d'ailleurs) que je n'ai pas encore corrigé, c'est lorsque tu changes des images ou en supprime, cela s'effectue correctement, mais la page ne se rafraichit pas, alors on croit que l'ancienne est toujours là. Mais en rafraichissant toi-même la page, tu constates que tes changements sont bien pris en compte. C'est juste un problème de cache qui ne se vide pas bien, je vais changer ça, t'inquiète.";
  const string5 =
    "Voulou, n'hésite pas à me dire ce qui va ou pas, et même à y saisir des données factices pour voir le résultats et comprendre comment ça marche (toute donnée est modifiable ou supprimable, ce n'est vraiment pas un problème de tester) et surtout voit pour le design, les choses qu'il faudrait changer. Enfin, j'attends ta signature, car comme tu peux le voir, j'ai mis en attendant une signature factice de toi, pour te rendre compte du résultat";
  const string6 =
    "Ah oui et j'avais oublié : j'ai mis des catégories, aussi bien pour les peintures que pour les sculptures. D'abord, il n'est pas obligatoire qu'une sculpture ou peinture ait une catégorie. Ensuite la création d'une catégorie (laquelle est alors proposée lors de la création de l'item en question), conditionne la création d'un sous-menu, c'est-à-dire que lorsqu'on cliquera sur 'peinture' ou 'sculpture' dans le menu général, un sous-menu de catégorie apparaitra pour pouvoir sélectionner les peintures sous la catégorie choisie. Si d'autres peintures n'ont pas de catégorie, alors dans le sous-menu figurera aussi 'sans catégorie' pour voir les items qui ne font pas partie d'une catégorie. Mais en tout cas, garde en tête que tout est modifiable, tu peux à tout moment changer de catégorie une peinture, une sculpture, ou la mettre sans catégorie, supprimer une catégorie ou la renommer, et plus généralement modifier ou supprimer n'importe quel item, ou post, ou autre contenu.";

  const string7 =
    "Pour les images de l'accueil, je n'ai pas encore implémenté le fait qu'elles défilent, ça va venir. À savoir que si tu mets une image en format portrait, elle sera largement coupé sur les écrans paysage (ordinateur de bureau), et non sur les écrans de portable. Cela changera car une fois que j'aurais géré l'affichage du site sur les portables (pas encore fait), alors je te proposerai la possibilité de mettre des photos différentes selon si c'est écran format paysage ou écran format portrait. Bon allé cette fois j'arrête !! Bisous !!";

  return (
    <>
      <AdminThemeComponent theme={themeFull} />
      <br />
      {string1}
      <br />
      <br />
      {string2}
      <br />
      <br />
      {string3}
      <br />
      <br />
      {string4}
      <br />
      <br />
      {string5}
      <br />
      <br />
      {string6}
      <br />
      <br />
      {string7}
    </>
  );
}
