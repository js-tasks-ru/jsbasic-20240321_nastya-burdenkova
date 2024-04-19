function toggleText() {
  const textElement = document.getElementById('text');

  document.querySelector('.toggle-text-button').addEventListener('click', function() {
    if (textElement.hasAttribute('hidden')) {
      textElement.removeAttribute('hidden');
    } else {
      textElement.setAttribute('hidden', true);
    }
  });
}
