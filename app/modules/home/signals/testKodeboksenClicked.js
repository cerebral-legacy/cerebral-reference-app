import redirect from 'common/factories/actions/redirect';

export default [
  redirect(
    process.env.NODE_ENV === 'production' ?
      '/courses/f644e54e-d6d1-44ae-ac97-ac5cea6be209/scenes/0'
    :
      '/courses'
    )
];
