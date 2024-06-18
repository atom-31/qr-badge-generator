import { module, test } from 'qunit';
import { setupRenderingTest } from 'qr-app/tests/helpers';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Component | qr-preview', function (hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function (assert) {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.set('myAction', function(val) { ... });

    await render(hbs`<QrPreview />`);

    assert.dom().hasText('');

    // Template block usage:
    await render(hbs`
      <QrPreview>
        template block text
      </QrPreview>
    `);

    assert.dom().hasText('template block text');
  });
});
