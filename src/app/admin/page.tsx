export default async function AdminIndex() {
  const string1 =
    "Bon je n'ai pas encore fait la gestion des couleurs accessible ici, mais j'ai pas mal avancé pour le reste.";
  const string2 =
    "Tu peux commencer à mettre du contenu, la base de donnée est stable, ça ne sera pas perdu. En revanche n'en met pas trop car je voudrais vérifier si les images ne vont pas être trop lourdes et à la fois si elles ne perdent pas trop de qualités, auquel cas il faudra que je modifie quelques trucs.";
  const string3 =
    "J'ai implémenté la rubrique que j'ai appelée 'post' (plus approprié peut-être que 'article' où l'on attends plutôt du texte. Tu peux y mettre autant de photos que tu veux, et le texte est facultatif, ou inversement d'ailleurs.";
  const string4 =
    "Il y a un petit beug (et sans doute d'autres d'ailleurs) que je n'ai pas encore corrigé, c'est lorsque tu modifies un post ou la page présentation, quand tu supprimes l'image principale, cela s'effectue correctement, mais elle peut parfois se réafficher quand tu demandes à la remodifier, c'est juste un problème de cache qui ne se vide pas assez.";
  const string5 =
    "Voulou, n'hésite pas à t'y promener, à y saisir des données factices pour voir le résultats et comprendre comment ça marche (toute donnée est modifiable ou supprimable) et surtout voit pour le design, les choses qu'il faudrait changer. Enfin, j'attends ta signature, car comme tu peux le voir, là où elle devrait apparaitre, au centre du menu, j'ai mis en attendant une petite photo, mais ça fausse le rendu.";
  const string6 =
    "Ah oui et j'avais oublié : j'ai mis des catégories, aussi bien pour les peintures que pour les sculptures. D'abord, il n'est pas obligatoire qu'une sculpture ou peinture ait une catégorie. Ensuite la création d'une catégorie (laquelle est alors proposée lors de la création de l'item en question), conditionne la création d'un sous-menu, c'est-à-dire que lorsqu'on cliquera sur 'peinture' dans le menu général par exemple, un sous-menu de catégorie apparaitra pour pouvoir sélectionner les peintures sous la catégorie choisie. Si d'autres peintures n'ont pas de catégorie, alors dans le sous-menu figurera aussi 'sans catégorie' pour voir les items non classé. Mais en tout cas, garde en tête que tout est modifiable, tu peux à tout moment changer de catégorie une peinture, une sculpture, ou la mettre sans catégorie, supprimer une catégorie ou la renomer, et plus généralement modifier ou supprimer n'importe quel item, ou post, ou autre contenu. Bon allé cette fois j'arrête !! Bisous !!";
  return (
    <>
      <h1>Administration</h1>
      <br />
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
    </>
  );
}
