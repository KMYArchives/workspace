<!DOCTYPE html>
<?php MetaTags::html_lang(); ?>
<head>
	<?php
	
		Page::css();

		MetaTags::title();
		MetaTags::favicon();

		MetaTags::robots();
		MetaTags::viewport();
		MetaTags::keywords();
		MetaTags::canonical();
		MetaTags::description();

		MetaTags::compatible();
		MetaTags::content_type();
		MetaTags::content_language();
	
	?>
</head>
<body>
	<?php

		Page::js();
		
	?>
</body>
</html>