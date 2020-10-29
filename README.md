# Modalz

This is a basic 'framework' for creating modals rather than a full solution.
Made for myself for reuse on client projects, with the ability to customise and extend.
Just need to give your 'triggers' a "data-modal" property matching the ID of your modals.

## Usage

JavaScript:

```javascript
import "modalz";
```

For the CSS, run the following from within your project root to copy and paste the base styles.
You can then override this through the variables, or however you like.

```
cp node_modules/modalz/src/style.css path/to/your/projects/styles
```

Example markup:

```html
<button data-modal="example">Example Modal</button>

<aside class="modal" id="example" data-timer="3000" data-expires="1">
  <div class="modal__inner">
    <button class="modal__close">
      <svg viewBox="0 0 24 24">
        <polyline points="3.5,3.5 12,12 20.5,20.5" />
        <polyline points="20.5,3.5 12,12 3.5,20.5" />
      </svg>
    </button>
    <div class="modal__content">
      <h2 class="modal__heading">Lorem ipsum dolor sit amet</h2>
      <p>
        Qui consectetur deserunt ipsum consectetur enim ex. Irure ipsum ipsum
        proident elit sit proident sint mollit velit sit. Aute cillum qui elit
        exercitation duis irure consectetur. Eu sunt sunt dolore velit ex
        incididunt laboris. Eu sint ullamco dolor consectetur esse irure et
        labore. Id pariatur non incididunt veniam.
      </p>
    </div>
  </div>
</aside>
```

The data-timer and data-expires are properties you can set to automatically pop up the modal after a given time (in milliseconds), and provide an expiry for the cookie this sets (so that users don't have it pop up every single visit). Defaults to one day if not passed in.
